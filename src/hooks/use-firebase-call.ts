import { useState } from "react";

function UseFirebaseCall<T>(isLazy: boolean, callback?:()=>Promise<T>){
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(isLazy);
    const [error, setError] = useState<any>();

    if(!isLazy){
        callFunction(callback)
    }

    async function callFunction(callback?: ()=>Promise<T>){
        try {
            setLoading(true);
            if(callback){
                const dataLocal = await callback();
                setData(dataLocal)
            }
        } catch (error) {
            setError(`ERROR: ${error}`)
        }finally{
            setLoading(false);
        }
    }

    function higherOrderFunction<T>(callback: (...params:any[])=>Promise<T>) {
        return function (...args: any) {
            setLoading(true);
            return callback(...args).then(()=>{
                setLoading(false);
                console.log("callback is done!");
            });
        };
    }

    return [higherOrderFunction, {data, loading, error, refetch: callFunction}]
}

export { UseFirebaseCall }