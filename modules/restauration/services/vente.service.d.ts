import { ErrorResponse } from "src/utilities/error";
import { DaoAchatService } from '../dao/dao.achat.service';
import { DaoStockService } from "../dao/dao.stock.service";
import { DaoVenteService } from "../dao/dao.vente.service";
import { DetailVenteModel } from "../models/detailVente";
import { TableModel } from "../models/table";
import { VenteModel } from "../models/vente";
export declare class VenteService {
    private readonly dao;
    private readonly daoStock;
    private readonly daoAchat;
    private error;
    constructor(dao: DaoVenteService, daoStock: DaoStockService, daoAchat: DaoAchatService);
    getError(): ErrorResponse;
    addVente(payload: VenteModel): Promise<VenteModel>;
    getVente(code: string): Promise<VenteModel>;
    getVenteByClientAndPeriod(param: any): Promise<VenteModel[]>;
    payerVente(payload: any): Promise<VenteModel>;
    montantTotalCalcul(details: DetailVenteModel[]): Promise<number>;
    getAllVente(fkAgence: string, venteService: string, debut: Date, fin: Date): Promise<VenteModel[]>;
    getDataForPieChartArticle(fkAgence: string, venteService: string, debut: Date, fin: Date): Promise<any[]>;
    getDataForLineChartVente(fkAgence: string, venteService: string, debut: Date, fin: Date): Promise<any[]>;
    getLastVente(fkAgence: string, venteService: string): Promise<VenteModel[]>;
    deleteLogicVente(code: string): Promise<VenteModel>;
    addTable(payload: TableModel): Promise<TableModel>;
    getAllTable(fkAgence: string): Promise<TableModel[]>;
}
