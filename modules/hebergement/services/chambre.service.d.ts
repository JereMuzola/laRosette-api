import { ErrorResponse } from "src/utilities/error";
import { DaoChambreService } from "../dao/dao.chambre.service";
export declare class ChambreService {
    private readonly dao;
    private error;
    constructor(dao: DaoChambreService);
    getError(): ErrorResponse;
    addChambre(payload: any): Promise<any>;
    findAll(): Promise<any>;
    findAllByAgence(fkAgence: string): Promise<any>;
    update(payload: any): Promise<any>;
    findChambre(payload: any): Promise<any>;
    deleteLogicChambre(payload: any): Promise<any>;
    deleteDefinitivelyChambre(payload: any): Promise<any>;
}
