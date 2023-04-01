export declare class factureRestaurentModel {
    code: string;
    montantHorsTaxe: number;
    tva: number;
    montantTTC: number;
    montantPaye: number;
    solde: number;
    dateCreate: Date;
    dateEdit: Date;
    fkVente: string;
    fkAgent: string;
    agent: string;
    fkAgence: string;
    agence: string;
    venteService: string;
    status: boolean;
    fkTaux: string;
    taux: number;
    static fromEntity(snapshot: any): factureRestaurentModel;
}
