import { ErrorResponse } from "src/utilities/error";
import { DaoAgentService } from "../dao/dao.agent.service";
import { DaoUtilisateurService } from "../dao/dao.utilisateur.service";
import { DaoAgenceService } from '../dao/dao.agence.service';
export declare class UtilisateurService {
    private readonly daoUtilisateur;
    private readonly daoAgent;
    private readonly daoAgence;
    private error;
    constructor(daoUtilisateur: DaoUtilisateurService, daoAgent: DaoAgentService, daoAgence: DaoAgenceService);
    getError(): ErrorResponse;
    login(payload: any): Promise<any>;
    register(payload: any): Promise<any>;
    findAll(): Promise<any>;
    update(payload: any): Promise<any>;
    findUtilisateur(payload: any): Promise<any>;
    deleteLogicUtilisateur(payload: any): Promise<any>;
    deleteDefinitivelyUtilisateur(payload: any): Promise<any>;
}
