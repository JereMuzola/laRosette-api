import { PrismaService } from "src/orm/prisma.service";
export declare class DaoGenericService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    add(obj: Object, payload: any): Promise<any>;
    findAll(obj: Object): Promise<any>;
    findUnique(obj: Object, payload: any): Promise<any>;
    findWhere(obj: Object, payload: any): Promise<any>;
    update(obj: Object, payload: any): Promise<any>;
    logicDelete(obj: Object, payload: any): Promise<any>;
    definitiveDelete(obj: Object, payload: any): Promise<any>;
}
