export interface BackUpResponse {
    items: User[];
}

export interface User  {
    index: number;
    index_start_at: number;
    integer: number;
    float: number;
    name: string;
    surname: string;
    fullname: string;
    email: string;
    bool: boolean
}