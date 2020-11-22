export interface JSONConfig {
    API_MOCS: ApiMocks;
}

interface ApiMocks {
    api1: JSONApi;
    api2: JSONApi;
}

interface JSONApi {
    url: string;
}
