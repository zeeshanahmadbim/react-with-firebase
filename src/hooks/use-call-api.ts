import { useEffect, useState } from "react";
import { requestConfig } from "../config/request";
import axios, { Method } from "axios";

type CallApiProps = {
    method: Method,
    url: string,
    isLazy?: boolean
}

function UseCallApi<T>({method, url, isLazy}:CallApiProps){
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(isLazy);
    const [error, setError] = useState<any>();

    useEffect(()=>{
        if(!isLazy) getData();
    },[])

    async function getData(){
        setLoading(true);
        try {
            const config = requestConfig({method, url});
            const response = await axios.request(config);
            setData(response.data as T);
        } catch (error) {
            console.error(`${error}`);
            setError(error)
        }finally{
            setLoading(false);
        }
        
    }

    return {data, loading, error}

}

export { UseCallApi }
