import { DetailAchatModel } from './detailAchat';
export declare class AchatModel {
    code: string;
    etat: string;
    montant_total: number;
    dateCreate: Date;
    dateEdit: Date;
    status: boolean;
    fkAgent: string;
    agent: string;
    fkAgence: string;
    agence: string;
    fkBonDecaissement?: string;
    fkCommande?: string;
    details: DetailAchatModel[];
    static fromEntity(snapshot: any): AchatModel;
}
