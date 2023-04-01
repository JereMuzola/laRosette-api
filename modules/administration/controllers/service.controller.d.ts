import { HttpDataResponse } from 'src/utilities/httpDataResponse';
import { LoggerService } from 'src/utilities/logger';
import { ServiceService } from '../services/service.service';
export declare class ServiceController {
    private readonly service;
    private readonly logger;
    constructor(service: ServiceService, logger: LoggerService);
    add(obj: any): Promise<HttpDataResponse<any>>;
    findAll(): Promise<HttpDataResponse<any>>;
    find(code: string): Promise<HttpDataResponse<any>>;
    delete(code: string): Promise<HttpDataResponse<any>>;
    deleteDefinitively(code: string): Promise<HttpDataResponse<any>>;
    update(payload: any): Promise<HttpDataResponse<any>>;
}
