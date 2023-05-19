import { ReactElement } from "react"
import { UseCallApi } from "../../hooks"

function TodoList():ReactElement{
    const {data, loading, error} = UseCallApi({method:'GET',url:'use'});

    if(loading){
        return <>Loading...</>
    }
    if(error){
        return <>Something went wrong</>
    }
    return <>TODO LIST</>
}

export {TodoList}