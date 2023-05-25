import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";

interface ITask{
    id?: string | null | undefined;
    description: string
    status?: string
    date?: Date | string
}

class Task{
    public id: string | null | undefined;
    public description: string;
    public status: string;
    public date: string | Date;

    constructor({id, description, status, date}:ITask){
        this.id = id;
        this.description = description;
        this.status = status || 'Open';
        this.date = date || new Date();
    }
}

export { Task }