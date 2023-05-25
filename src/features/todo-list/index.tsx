import { ReactElement, useState } from "react"
import { UseFirebaseCall, UseLazyCallApi } from "../../hooks"
import { TaskDetail, TaskTile } from "./components";
import { Task } from "../../types";

import { Button } from 'reactstrap';

import styles from './styles.module.scss';
import { UseGetTasksFromFirebase } from "./hooks";
import { updateDocumentByRef } from "../../helpers";

function TodoList():ReactElement{
    const [taskDetailOpen, setTaskDetailOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();

    const {data: firebaseTasks, loading, error} = UseGetTasksFromFirebase();

    // const [updateFunction, {loading: updatingOnFE}] = UseFirebaseCall<Task>(true);

    const [createTask,{loading: creating}] = UseLazyCallApi({method:'POST', url: 'task'});
    const [updateTask,{loading: updating}] = UseLazyCallApi({method:'PUT', url: 'task'});
    const [deleteTask,{loading: deleting}] = UseLazyCallApi({method:'DELETE', url: 'task'});

    const tasks = firebaseTasks;

    async function onSave(task: Task){
        if(task.id){
            await updateTask(task)
            // const up =  updateFunction(updateDocumentByRef)
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
        // refetch();
    }

    function onNewTaskClicked(){
        setSelectedTask(undefined);
        setTaskDetailOpen(true);
    }

    function clickedOnTask(task: Task){
        setSelectedTask(task);
        setTaskDetailOpen(true);
    }

    if(loading || creating || updating || deleting ){
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
                {tasks?.map(task=> <TaskTile key={task.id} task={task} onClick={clickedOnTask}/>)}
            </div>
        </div>
        {taskDetailOpen ? 
            <TaskDetail open={taskDetailOpen} setOpen={setTaskDetailOpen} onSave={onSave} task={selectedTask} onDelete={onDelete}/> : null
        }
    </>
}

export {TodoList}