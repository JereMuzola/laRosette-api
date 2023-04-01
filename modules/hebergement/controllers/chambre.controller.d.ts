import { HttpDataResponse } from 'src/utilities/httpDataResponse';
import { LoggerService } from 'src/utilities/logger';
import { ChambreService } from '../services/chambre.service';
export declare class ChambreController {
    private readonly service;
    private readonly logger;
    constructor(service: ChambreService, logger: LoggerService);
    add(obj: any): Promise<HttpDataResponse<any>>;
    findAll(): Promise<HttpDataResponse<any>>;
    findAllByAgence(fkAgence: string): Promise<HttpDataResponse<any>>;
    find(code: string): Promise<HttpDataResponse<any>>;
    delete(code: string): Promise<HttpDataResponse<any>>;
    deleteDefinitively(code: string): Promise<HttpDataResponse<any>>;
    update(payload: any): Promise<HttpDataResponse<any>>;
}
