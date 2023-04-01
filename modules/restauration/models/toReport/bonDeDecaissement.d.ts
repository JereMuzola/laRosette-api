export declare class BonDeDecaissementModel {
    code: string;
    dateCreate: Date;
    fkDocSoubassement: string;
    motif: string;
    fkAgent: string;
    agent: string;
    fkAgence: string;
    agence: string;
    fkOrdre: string;
    montant: number;
    status: boolean;
    etat: string;
    isAuberge: boolean;
    isTerasse: boolean;
    static fromEntity(snapshot: any): BonDeDecaissementModel;
}
