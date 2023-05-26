import { useEffect, useState } from "react"
import { getDocumentList } from "../../../helpers";
import { Task } from "../../../data-mappers";

function UseGetTasksFromFirebase(){
    const [data, setData] = useState<Array<Task>>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(()=>{
        getData();
    },[])

    async function getData(){
        try {
            const dataLocal = await getDocumentList<Task>('task')
            setData(dataLocal)
        } catch (error) {
            setError(`${error}`)
        }finally{
            setLoading(false)
        }
    }

    return { data, loading, error, refetch: getData }
}

export {UseGetTasksFromFirebase}