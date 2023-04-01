import { DetailOccupationModel } from './detail.occupation';
import { FactureModel } from './facture';
export declare class OccupationModel {
    code: string;
    dateCreate: Date;
    status: string;
    montantAPayer: number;
    etat: string;
    fkClientResponsable: string;
    clientResponsable?: string;
    fkReservation: string;
    fkAgence: string;
    agence: string;
    fkAgent: string;
    agent: string;
    details: DetailOccupationModel[];
    facture: FactureModel;
    typeOccupation: string;
    static fromEntity(snapshot: any): OccupationModel;
}
