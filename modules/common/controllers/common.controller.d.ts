import { HttpDataResponse } from 'src/utilities/httpDataResponse';
import { LoggerService } from 'src/utilities/logger';
import { CommonService } from '../services/common.service';
export declare class CommonController {
    private readonly service;
    private readonly logger;
    constructor(service: CommonService, logger: LoggerService);
    addDevise(obj: any): Promise<HttpDataResponse<any>>;
    findDevise(code: string): Promise<HttpDataResponse<any>>;
    findAllDevise(): Promise<HttpDataResponse<any>>;
    deleteDevise(code: string): Promise<HttpDataResponse<any>>;
    addTauxChange(obj: any): Promise<HttpDataResponse<any>>;
    findTaux(code: string): Promise<HttpDataResponse<any>>;
    findTauxToApply(): Promise<HttpDataResponse<any>>;
    findAllTauxChange(): Promise<HttpDataResponse<any>>;
    addClient(obj: any): Promise<HttpDataResponse<any>>;
    findClient(code: string): Promise<HttpDataResponse<any>>;
    deleteClient(code: string): Promise<HttpDataResponse<any>>;
    findAllClient(fkAgence: string): Promise<HttpDataResponse<any>>;
    findAllClientHosted(fkAgence: string): Promise<HttpDataResponse<any>>;
    findAllClientNoHosted(fkAgence: string): Promise<HttpDataResponse<any>>;
}
