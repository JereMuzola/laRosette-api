import { DaoChambreService } from "src/modules/hebergement/dao/dao.chambre.service";
import { DaoStockService } from "src/modules/restauration/dao/dao.stock.service";
import { ErrorResponse } from "src/utilities/error";
import { DaoAgenceService } from "../dao/dao.agence.service";
import { DaoAgentService } from "../dao/dao.agent.service";
export declare class AgenceService {
    private readonly dao;
    private readonly daoAgent;
    private readonly daochambre;
    private readonly daoArticle;
    private error;
    constructor(dao: DaoAgenceService, daoAgent: DaoAgentService, daochambre: DaoChambreService, daoArticle: DaoStockService);
    getError(): ErrorResponse;
    addAgence(payload: any): Promise<any>;
    findAll(): Promise<any>;
    update(payload: any): Promise<any>;
    findAgence(payload: any): Promise<any>;
    deleteLogicAgence(payload: any): Promise<any>;
    deleteDefinitivelyAgence(payload: any): Promise<any>;
}
