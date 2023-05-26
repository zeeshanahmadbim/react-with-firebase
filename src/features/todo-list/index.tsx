import { ReactElement, useState } from "react";
import { TaskDetail, TaskTile } from "./components";
import { Task } from "../../types";

import { Button } from 'reactstrap';

import styles from './styles.module.scss';
import { UseGetTasksFromFirebase } from "./hooks";
import { removeDoc, upsertDocument } from "../../helpers";
import { CustomButton } from "../../components";

function TodoList():ReactElement{
    const [taskDetailOpen, setTaskDetailOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();
    const [isLoading, setIsLoading] = useState(false);

    const {data: firebaseTasks, loading: fetchingData, error, refetch} = UseGetTasksFromFirebase();

    const tasks = firebaseTasks;

    async function onSave(task: Task){
        setIsLoading(true);
        await upsertDocument('task', task);
        setIsLoading(false);
        refreshData();
    }

    async function onDelete(task: Task){
        setIsLoading(true)
        await removeDoc('task', task.id as string);
        refreshData();
        setIsLoading(false)
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

    if(fetchingData || isLoading){
        return <>Loading...</>
    }

    if(error){
        return <>Something went wrong</>
    }

    return <>
        
        <div className={styles.todoContainer}>
            <div className={styles.todoList}>
                <div className={styles.buttonContainer}>
                    <CustomButton onClick={onNewTaskClicked} varient="light">New Task</CustomButton>
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