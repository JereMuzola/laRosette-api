export declare class OrdreDeDecaissementModel {
    code: string;
    dateCreate: Date;
    fkDocumentSoubassement: string;
    motif: string;
    fkAgentEmitter: string;
    agentEmitter: string;
    fkAgentReceiver: string;
    agentReceiver: string;
    montant: number;
    status: boolean;
    lieuEmission: string;
    isValidateByCoordon: boolean;
    agence: string;
    fkAgence: string;
    isAuberge: boolean;
    isTerasse: boolean;
    static fromEntity(snapshot: any): OrdreDeDecaissementModel;
}
