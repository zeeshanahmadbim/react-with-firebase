export type Task = {
    id?: string,
    description: string,
    status: string,
    date?: Date | string,
}

export type ListTasksApi = {
    data: Array<Task>
}