import { DetailFactureModel } from "./detail.facture";
export declare class FactureModel {
    code: string;
    deteCreate: Date;
    dateEdit: Date;
    status: boolean;
    montantAPayer: number;
    montantPaye: number;
    solde: number;
    isPaid: boolean;
    clientResponsable: string;
    fkClientResponsable: string;
    fkOccupation: string;
    details: DetailFactureModel[];
    fkAgent: string;
    agent: string;
    fkAgence: string;
    agence: string;
    fkTaux: string;
    taux: number;
    static fromEntity(snapshot: any): FactureModel;
}
