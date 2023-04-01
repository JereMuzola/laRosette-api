export declare class DetailFactureModel {
    id: number;
    montant: number;
    fkClientOccupant: string;
    clientOccupant: string;
    fkChambre: string;
    numChambre: string;
    fkFacture: string;
    static fromEntity(snapshot: any): DetailFactureModel;
}
