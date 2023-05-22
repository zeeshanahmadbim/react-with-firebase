import { Method } from "axios"

export type CallApiProps = {
    method: Method,
    url: string,
    isLazy?: boolean
}