import { HttpDataResponse } from 'src/utilities/httpDataResponse';
import { LoggerService } from 'src/utilities/logger';
import { VenteService } from '../services/vente.service';
export declare class Ventecontroller {
    private readonly service;
    private readonly logger;
    constructor(service: VenteService, logger: LoggerService);
    addVente(obj: any): Promise<HttpDataResponse<any>>;
    payerVente(obj: any): Promise<HttpDataResponse<any>>;
    find(code: string): Promise<HttpDataResponse<any>>;
    findByClientAndPeriod(obj: any): Promise<HttpDataResponse<any>>;
    findAll(obj: any): Promise<HttpDataResponse<any>>;
    addTable(obj: any): Promise<HttpDataResponse<any>>;
    findAllTable(fkAgence: string): Promise<HttpDataResponse<any>>;
    findAllDataForPieChartArticle(obj: any): Promise<HttpDataResponse<any>>;
    findAllDataForLineChartVente(obj: any): Promise<HttpDataResponse<any>>;
    findLast(fkAgence: string, VenteService: string): Promise<HttpDataResponse<any>>;
    logicDeleteVente(code: string): Promise<HttpDataResponse<any>>;
}
