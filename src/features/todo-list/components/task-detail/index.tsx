import { ReactElement, useState } from "react"
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
// import { Task } from "../../../../types"

import styles from './styles.module.scss';
import { Task } from "../../../../data-mappers";

type TaskDetailProps = {
    open: boolean,
    setOpen: (open: boolean)=>void,
    task?: Task,
    onSave: (task: Task)=>void,
    onDelete?:(task: Task)=>void
}
function TaskDetail({open, setOpen, task, onSave, onDelete}: TaskDetailProps):ReactElement{
    const [taskLocal, setTaskLocal] = useState<Task>(task || new Task({description:""}));

    function updateTask(attribute: keyof Task, value: string){
        setTaskLocal({...taskLocal, [attribute]: value})
    }

    function handleOnSave(){
        if(onSave) onSave(taskLocal)
    }

    function handleOnDelete(){
        if(onDelete) onDelete(taskLocal)
    }



    return <>
        <Modal isOpen={open} toggle={() => setOpen(false)}>
            <ModalHeader>
                Task
            </ModalHeader>
            <ModalBody>
                <Input value={taskLocal?.description} type="textarea" onChange={(e)=>{updateTask('description', e.currentTarget.value)}}/>
                <Input value={taskLocal?.status} type="select" className={styles.selectInput} onChange={(e)=> updateTask('status', e.currentTarget.value)}>
                    <option>Open</option>
                    <option>Done</option>
                </Input>
            </ModalBody>
            <ModalFooter>
                <Button color="light" onClick={()=>setOpen(false)}>Cancel</Button>
                {taskLocal.id ? <Button color="danger" onClick={handleOnDelete}>Delete</Button> :<></>}
                <Button color="primary" onClick={handleOnSave}>Save</Button>
            </ModalFooter>
        </Modal>
    </>
}


export {TaskDetail}