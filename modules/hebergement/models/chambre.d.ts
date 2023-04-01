export declare class ChambreModel {
    code: string;
    numero: string;
    description: string;
    etat: string;
    status: boolean;
    dateCreate: Date;
    fkAgence: string;
    agence: string;
    tel?: string;
    prix?: number;
    fkDevise: string;
    devise: string;
    static fromEntity(snapshot: any): ChambreModel;
}
