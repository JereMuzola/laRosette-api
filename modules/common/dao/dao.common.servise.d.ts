import { PrismaService } from 'src/orm/prisma.service';
import { ClientModel } from '../models/client';
import { DeviseModel } from '../models/devise';
import { TauxChangeModel } from '../models/taux.change';
export declare class DaoCommonService {
    private static _instance;
    private static _prisma;
    static instance(): PrismaService;
    constructor();
    addDevise(payload: DeviseModel): Promise<DeviseModel>;
    updateDevise(payload: DeviseModel): Promise<DeviseModel>;
    getAllDevise(): Promise<DeviseModel[]>;
    getDevise(code: string): Promise<DeviseModel>;
    deleteDevise(code: string): Promise<DeviseModel>;
    addTauxChange(payload: TauxChangeModel): Promise<TauxChangeModel>;
    getAllTauxChange(): Promise<TauxChangeModel[]>;
    getTauxToApply(): Promise<TauxChangeModel>;
    getTaux(code: string): Promise<TauxChangeModel>;
    addClient(payload: ClientModel): Promise<ClientModel>;
    updateClient(payload: ClientModel): Promise<ClientModel>;
    deleteClient(code: string): Promise<ClientModel>;
    getAllClient(fkAgence: string): Promise<ClientModel[]>;
    getAllClientHosted(fkAgence: string): Promise<ClientModel[]>;
    getAllClientNoHosted(fkAgence: string): Promise<ClientModel[]>;
    getClient(code: string): Promise<ClientModel>;
    getClientByNoms(nom: string, postnom?: string, prenom?: string): Promise<ClientModel>;
}
