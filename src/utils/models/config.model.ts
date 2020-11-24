
export interface IApiConf{
    url: string;
}

interface IApiMocs{
    [key: string]: IApiConf;
}

export interface IConfigApi{
    API_MOCS: IApiMocs;
}