export interface ResponseError extends Error {   
    status?: number;
    code?: number;
} 
