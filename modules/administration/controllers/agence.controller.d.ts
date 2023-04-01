import { HttpDataResponse } from 'src/utilities/httpDataResponse';
import { LoggerService } from 'src/utilities/logger';
import { AgenceService } from '../services/agence.service';
export declare class AgenceController {
    private readonly service;
    private readonly logger;
    constructor(service: AgenceService, logger: LoggerService);
    add(obj: any): Promise<HttpDataResponse<any>>;
    findAll(): Promise<HttpDataResponse<any>>;
    find(code: string): Promise<HttpDataResponse<any>>;
    delete(code: string): Promise<HttpDataResponse<any>>;
    deleteDefinitively(code: string): Promise<HttpDataResponse<any>>;
    update(payload: any): Promise<HttpDataResponse<any>>;
}
