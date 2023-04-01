import { ErrorResponse } from "src/utilities/error";
import { DaoAgenceService } from "../dao/dao.agence.service";
import { DaoAgentService } from "../dao/dao.agent.service";
import { DaoServiceService } from "../dao/dao.service.service";
export declare class AgentService {
    private readonly dao;
    private readonly daoAgence;
    private readonly daoService;
    private error;
    constructor(dao: DaoAgentService, daoAgence: DaoAgenceService, daoService: DaoServiceService);
    getError(): ErrorResponse;
    add(payload: any): Promise<any>;
    findAll(): Promise<any>;
    findAllAgentGerant(): Promise<any>;
    update(payload: any): Promise<any>;
    find(payload: any): Promise<any>;
    deleteLogic(payload: any): Promise<any>;
    deleteDefinitively(payload: any): Promise<any>;
}
