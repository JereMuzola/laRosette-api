import { HttpDataResponse } from 'src/utilities/httpDataResponse';
import { LoggerService } from 'src/utilities/logger';
import { OccupationService } from '../services/occupation.service';
export declare class OccupationController {
    private readonly service;
    private readonly logger;
    constructor(service: OccupationService, logger: LoggerService);
    add(obj: any): Promise<HttpDataResponse<any>>;
    payerOccupation(obj: any): Promise<HttpDataResponse<any>>;
    findAll(): Promise<HttpDataResponse<any>>;
    findAllByAgence(obj: any): Promise<HttpDataResponse<any>>;
    findDataAubergeByClient(obj: any): Promise<HttpDataResponse<any>>;
    findDataAubergeByClientAndPeriod(obj: any): Promise<HttpDataResponse<any>>;
    findLast(fkAgence: string): Promise<HttpDataResponse<any>>;
    findCountChambreByState(fkAgence: string): Promise<HttpDataResponse<any>>;
    findDataForLineChartOccupation(obj: any): Promise<HttpDataResponse<any>>;
    find(code: string): Promise<HttpDataResponse<any>>;
    delete(code: string): Promise<HttpDataResponse<any>>;
    deleteDefinitively(code: string): Promise<HttpDataResponse<any>>;
    deleteDefinitivelyDetail(id: number): Promise<HttpDataResponse<any>>;
    update(payload: any): Promise<HttpDataResponse<any>>;
}
