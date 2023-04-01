export declare enum ErrorResponseStatus {
    KO = "KO",
    OK = "OK",
    EXIST = "EXIST"
}
export declare class ErrorResponse {
    errorCode: string;
    errorDescription: string;
    constructor(code: ErrorResponseStatus, description: string);
    clear(): void;
}
