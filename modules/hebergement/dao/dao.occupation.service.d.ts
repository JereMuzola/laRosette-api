import { PrismaService } from "src/orm/prisma.service";
import { FactureModel } from "../models/facture";
import { OccupationModel } from "../models/occupation";
import { DaoGenericService } from "./dao.generic.service";
export declare class DaoOccupationService {
    private readonly dao;
    private readonly prisma;
    constructor(dao: DaoGenericService, prisma: PrismaService);
    create(payload: OccupationModel): Promise<any>;
    createPaiement(payload: any): Promise<any>;
    payerOccupation(payload: any): Promise<any>;
    getDataForLineChartOccupationDaily(fkAgence: string, debut: Date, fin: Date): Promise<any>;
    getDataForLineChartOccupationWeekly(fkAgence: string, debut: Date, fin: Date): Promise<any>;
    getDataForLineChartOccupationMonthly(fkAgence: string, debut: Date, fin: Date): Promise<any>;
    getDataForLineChartOccupationYearly(fkAgence: string, debut: Date, fin: Date): Promise<any>;
    createFacture(payload: FactureModel): Promise<any>;
    findLast(fkAgence: string): Promise<any[]>;
    findCountChambreByState(fkAgence: string): Promise<any[]>;
    addDetailOccupation(payload: any): Promise<any>;
    addDetailFacture(payload: any): Promise<any>;
    updateDetailOccupation(payload: any): Promise<any>;
    updateDetailFacture(payload: any): Promise<any>;
    deleteDetailOccupation(payload: any): Promise<any>;
    findAllByOccupation(fkOccupation: string): Promise<any[]>;
    findAllByFacture(fkFacture: string): Promise<any[]>;
    findAll(): Promise<any[]>;
    findAllByAgence(fkAgence: string, debut: Date, fin: Date): Promise<any[]>;
    find(payload: any): Promise<any>;
    findFacture(payload: any): Promise<any>;
    findFactureByOccupation(payload: any): Promise<any>;
    findDetail(payload: any): Promise<any>;
    findDetailFacture(payload: any): Promise<any>;
    findDataAubergeByClientAndPeriod(payload: any): Promise<any>;
    update(payload: any): Promise<any>;
    updateFacture(payload: any): Promise<any>;
    logicDelete(payload: any): Promise<any>;
    definitiveDelete(payload: any): Promise<any>;
}
