import { ChambreModel } from './chambre';
import { ClientModel } from '../../common/models/client';
export declare class ReservationModel {
    code: string;
    date_debut: Date;
    date_fin: Date;
    heure_debut: string;
    heure_fin: boolean;
    dateCreate: Date;
    status: string;
    montant_a_payer: number;
    etat: string;
    fkClient: string;
    fkChambre: string;
    client?: ClientModel;
    chambre?: ChambreModel;
    static fromEntity(snapshot: any): ReservationModel;
}
