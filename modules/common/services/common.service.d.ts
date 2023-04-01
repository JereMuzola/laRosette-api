import { ErrorResponse } from "src/utilities/error";
import { DaoCommonService } from '../dao/dao.common.servise';
import { ClientModel } from "../models/client";
import { DeviseModel } from "../models/devise";
import { TauxChangeModel } from "../models/taux.change";
export declare class CommonService {
    private readonly dao;
    private error;
    constructor(dao: DaoCommonService);
    getError(): ErrorResponse;
    addDevise(payload: DeviseModel): Promise<DeviseModel>;
    getDevise(code: string): Promise<DeviseModel>;
    getAllDevise(): Promise<DeviseModel[]>;
    deleteDevise(code: string): Promise<DeviseModel>;
    addClient(payload: ClientModel): Promise<ClientModel>;
    getClient(code: string): Promise<ClientModel>;
    getClientByNoms(nom: string, postnom?: string, prenom?: string): Promise<ClientModel>;
    getAllClient(fkAgence: string): Promise<ClientModel[]>;
    getAllClientHosted(fkAgence: string): Promise<ClientModel[]>;
    getAllClientNoHosted(fkAgence: string): Promise<ClientModel[]>;
    deleteClient(code: string): Promise<ClientModel>;
    addTauxChange(payload: TauxChangeModel): Promise<TauxChangeModel>;
    getTaux(code: string): Promise<TauxChangeModel>;
    getTauxToApply(): Promise<TauxChangeModel>;
    getAllTaux(): Promise<TauxChangeModel[]>;
}
