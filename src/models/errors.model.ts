export interface Error {
    error: string,
    key: string,
    status?: number
}

export type ErrorsMap = {[code: string]: Error}