import { ChambreModel } from "src/modules/hebergement/models/chambre";
export declare class AgenceModel {
    code: string;
    description: string;
    adresse: string;
    commune: string;
    ville: string;
    quartier: string;
    territoire: string;
    secteur: string;
    village: string;
    province: string;
    avenue: string;
    numero: string;
    status: boolean;
    dateCreate: Date;
    chambres: ChambreModel[];
    static fromEntity(snapshot: any): AgenceModel;
}
