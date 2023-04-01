import { ErrorResponse } from "src/utilities/error";
import { DaoChambreService } from "../dao/dao.chambre.service";
import { DaoOccupationService } from "../dao/dao.occupation.service";
import { DetailOccupationModel } from "../models/detail.occupation";
import { OccupationModel } from "../models/occupation";
export declare class OccupationService {
    private readonly dao;
    private readonly daoChambre;
    private error;
    constructor(dao: DaoOccupationService, daoChambre: DaoChambreService);
    getError(): ErrorResponse;
    addOccupation(payload: OccupationModel): Promise<any>;
    payerOccupation(payload: any): Promise<any>;
    calculateMontantTotal(details: DetailOccupationModel[], occupation: OccupationModel): Promise<any>;
    findAll(): Promise<any>;
    findAllByAgence(fkAgence: string, debut: Date, fin: Date): Promise<any>;
    findDataAubergeByClientAndPeriod(payload: any): Promise<any>;
    findLast(fkAgence: string): Promise<any>;
    findCountChambreByState(fkAgence: string): Promise<any>;
    getDataForLineChartOccupation(fkAgence: string, debut: Date, fin: Date): Promise<any[]>;
    update(payload: any): Promise<any>;
    findOccupation(payload: any): Promise<any>;
    deleteLogicOcupation(payload: any): Promise<any>;
    deleteDefinitivelyOccupation(payload: any): Promise<any>;
    deleteDefinitivelyDetailOccupation(payload: any): Promise<any>;
    updateDetailOccupation(payload: any): Promise<any>;
}
