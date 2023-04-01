import { ErrorResponse } from "src/utilities/error";
import { DaoAgentService } from "../dao/dao.agent.service";
import { DaoServiceService } from "../dao/dao.service.service";
import { ServiceModel } from "../models/service";
export declare class ServiceService {
    private readonly dao;
    private readonly daoAgent;
    private error;
    constructor(dao: DaoServiceService, daoAgent: DaoAgentService);
    getError(): ErrorResponse;
    add(payload: ServiceModel): Promise<any>;
    findAll(): Promise<any>;
    update(payload: any): Promise<any>;
    find(payload: any): Promise<any>;
    deleteLogic(payload: any): Promise<any>;
    deleteDefinitively(payload: any): Promise<any>;
}
