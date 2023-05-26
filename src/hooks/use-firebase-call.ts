import { useEffect, useState } from "react";

function UseFirebaseCall(isLazy: boolean, callback?:any){
    const [data, setData] = useState();
    const [loading, setLoading] = useState(isLazy);
    const [error, setError] = useState<any>();

    if(!isLazy){
        callFunction(callback)
    }

    async function callFunction(callback?: ()=>Promise<any>){
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


function abc(callback: (...args: any[]) => void){
    const [status, setStatus] = useState('idle');

  const callCallback = (...args: any[]) => {
    setStatus('loading');

    // Simulate an asynchronous operation
    setTimeout(() => {
      callback(...args);
      setStatus('success');
    }, 1000);
  };

  useEffect(() => {
    setStatus('idle');
  }, [callback]);
  return {status, callCallback}
}

export { UseFirebaseCall }