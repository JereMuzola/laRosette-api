import { ClientModel } from "src/modules/restauration/models/client";
import { DaoGenericService } from "./dao.generic.service";
export declare class DaoClientService {
    private readonly dao;
    constructor(dao: DaoGenericService);
    findAll(): Promise<ClientModel>;
}
