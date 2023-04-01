import { HttpDataResponse } from 'src/utilities/httpDataResponse';
import { LoggerService } from 'src/utilities/logger';
import { AgentService } from '../services/agent.service';
export declare class AgentController {
    private readonly service;
    private readonly logger;
    constructor(service: AgentService, logger: LoggerService);
    add(obj: any): Promise<HttpDataResponse<any>>;
    findAll(): Promise<HttpDataResponse<any>>;
    findAllGerant(): Promise<HttpDataResponse<any>>;
    find(code: string): Promise<HttpDataResponse<any>>;
    delete(code: string): Promise<HttpDataResponse<any>>;
    deleteDefinitively(code: string): Promise<HttpDataResponse<any>>;
    update(payload: any): Promise<HttpDataResponse<any>>;
}
