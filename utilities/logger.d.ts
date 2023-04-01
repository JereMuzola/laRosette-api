import { Logger } from 'winston';
export declare class LoggerService {
    private readonly logger;
    constructor(logger: Logger);
    log(type: TypeLog, message: any): void;
}
export declare enum TypeLog {
    DEBUG = 0,
    ERROR = 1,
    INFO = 2
}
