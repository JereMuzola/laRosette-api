export declare class PaiementModel {
    id: number;
    numTransaction: string;
    libelle: string;
    transactionDate: Date;
    status: boolean;
    transactionMontant: number;
    transactionDevise: string;
    montantConverti: number;
    deviseConversion: string;
    typePaiement: string;
    taux: number;
    fkAgent: string;
    fkAgence: string;
    agence: string;
    agent: string;
    fkFacture: string;
    fkCompte: string;
    fkTransactionCentre: string;
    static fromEntity(snapshot: any): PaiementModel;
}
