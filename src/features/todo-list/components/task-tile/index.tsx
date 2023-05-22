import { ReactElement } from "react"
import { Task } from "../../../../types"

import styles from './styles.module.scss';

type TaskTileProps = {
    task: Task;
    onClick?:(task: Task)=>void
}

function TaskTile({task, onClick}: TaskTileProps): ReactElement{
    return(
        <div className={styles.container} onClick={()=>onClick && onClick(task)}>
            <div>
                {task?.description}
            </div>
        </div>
    )
    
}

export { TaskTile }