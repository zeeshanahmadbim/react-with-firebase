import { useEffect, useState } from "react";
import { requestConfig } from "../config/request";
import axios, { Method } from "axios";
import { CallApiProps } from "./types";

function UseLazyCallApi<T>({method, url, isLazy}:CallApiProps): [(input: any)=>Promise<T | void>,{data:T | undefined, loading: boolean | undefined, error: any}]{
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(isLazy);
    const [error, setError] = useState<any>();

    async function hitApi(input=null){
        setLoading(true);
        try {
            const config = requestConfig({method, url, data: input});
            const response = await axios.request(config);
            setData(response.data as T);
        } catch (error) {
            console.error(`${error}`);
            setError(error)
        }finally{
            setLoading(false);
        }
        
    }

    return [hitApi, {data, loading, error}]

}

export { UseLazyCallApi }
