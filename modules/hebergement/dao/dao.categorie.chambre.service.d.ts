import { DaoGenericService } from "./dao.generic.service";
import { PrismaService } from '../../../orm/prisma.service';
export declare class DaoCategorieChambreService {
    private readonly dao;
    private readonly prisma;
    constructor(dao: DaoGenericService, prisma: PrismaService);
    create(payload: any): Promise<any>;
    findAll(): Promise<any[]>;
    find(payload: any): Promise<any>;
    update(payload: any): Promise<any>;
    logicDelete(payload: any): Promise<any>;
    definitiveDelete(payload: any): Promise<any>;
}
