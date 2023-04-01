import { ChambreModel } from "./chambre";
export declare class DetailOccupationModel {
    id: number;
    fkOccupation: string;
    fkClient: string;
    client: string;
    chambre: ChambreModel;
    numChambre: string;
    fkChambre: string;
    dateArrive: Date;
    dateDepart: Date;
    heureDepart: string;
    heureArrive: string;
    montantAPayer: number;
    etat: string;
    static fromEntity(snapshot: any): DetailOccupationModel;
}
