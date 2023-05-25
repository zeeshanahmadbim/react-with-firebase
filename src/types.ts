import { Task as MapperTask} from "./data-mappers"

export type Task = MapperTask

export type ListTasksApi = {
    data: Array<Task>
}

export type FirebaseConfiguration = {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
  }