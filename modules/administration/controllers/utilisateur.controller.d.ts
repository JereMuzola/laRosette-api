import { HttpDataResponse } from 'src/utilities/httpDataResponse';
import { LoggerService } from 'src/utilities/logger';
import { UtilisateurService } from '../services/utilisateur.service';
export declare class UtilisateurController {
    private readonly service;
    private readonly logger;
    constructor(service: UtilisateurService, logger: LoggerService);
    register(obj: any): Promise<HttpDataResponse<any>>;
    login(obj: any): Promise<HttpDataResponse<any>>;
    findAll(): Promise<HttpDataResponse<any>>;
    findUtilisateur(code: string): Promise<HttpDataResponse<any>>;
    deleteUtilisateur(code: string): Promise<HttpDataResponse<any>>;
    deleteDefinitivelyUtilisateur(code: string): Promise<HttpDataResponse<any>>;
    updateUtilisateur(payload: any): Promise<HttpDataResponse<any>>;
}
