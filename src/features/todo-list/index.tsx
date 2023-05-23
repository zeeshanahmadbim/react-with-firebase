import { ReactElement, useState } from "react"
import { UseCallApi, UseLazyCallApi } from "../../hooks"
import { TaskDetail, TaskTile } from "./components";
import { ListTasksApi, Task } from "../../types";

import { Button } from 'reactstrap';

import styles from './styles.module.scss';

function TodoList():ReactElement{
    const [taskDetailOpen, setTaskDetailOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();

    const {data, loading, error, refetch} = UseCallApi<ListTasksApi>({method:'GET',url:'task'});
    const [createTask,{loading: creating}] = UseLazyCallApi({method:'POST', url: 'task'});
    const [updateTask,{loading: updating}] = UseLazyCallApi({method:'PUT', url: 'task'});
    const [deleteTask,{loading: deleting}] = UseLazyCallApi({method:'DELETE', url: 'task'});

    async function onSave(task: Task){
        if(task.id){
            await updateTask(task)
        }else{
            await createTask(task);
        }
        refreshData()
    }

    async function onDelete(task: Task){
        await deleteTask(task);
        refreshData();
    }

    function refreshData(){
        setTaskDetailOpen(false)
        refetch();
    }

    function onNewTaskClicked(){
        setSelectedTask(undefined);
        setTaskDetailOpen(true);
    }

    function clickedOnTask(task: Task){
        setSelectedTask(task);
        setTaskDetailOpen(true);
    }

    if(loading || creating || updating || deleting){
        return <>Loading...</>
    }

    if(error){
        return <>Something went wrong</>
    }

    return <>
        
        <div className={styles.todoContainer}>
            <div className={styles.todoList}>
                <div className={styles.buttonContainer}>
                    <Button onClick={onNewTaskClicked} color="success">New Task</Button>
                </div>
                {data?.data?.map(task=> <TaskTile key={task.id} task={task} onClick={clickedOnTask}/>)}
            </div>
        </div>
        {taskDetailOpen ? 
            <TaskDetail open={taskDetailOpen} setOpen={setTaskDetailOpen} onSave={onSave} task={selectedTask} onDelete={onDelete}/> : null
        }
    </>
}

export {TodoList}