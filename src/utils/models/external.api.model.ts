
export interface IItem{
    index: number;
    index_start_at: 59;
    integer: number;
    float: number;
    name: string;
    surname: string
    fullname: string;
    email: string;
    bool: boolean;
}

export interface IResponseDataApi{
    items: IItem[];
}