import { PrismaService } from "src/orm/prisma.service";
import { DaoGenericService } from "./dao.generic.service";
export declare class DaoAgentService {
    private readonly dao;
    private readonly prisma;
    constructor(dao: DaoGenericService, prisma: PrismaService);
    create(payload: any): Promise<any>;
    verifyData(payload: any): Promise<any>;
    findAll(): Promise<any[]>;
    findAllAgentGerant(): Promise<any[]>;
    findByAgence(fkAgence: string): Promise<any[]>;
    find(payload: any): Promise<any>;
    update(payload: any): Promise<any>;
    logicDelete(payload: any): Promise<any>;
    definitiveDelete(payload: any): Promise<any>;
}
