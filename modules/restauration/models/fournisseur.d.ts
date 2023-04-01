export declare class FournisseurModel {
    nom: string;
    postnom: string;
    code: string;
    prenom: string;
    societe: string;
    tel: string;
    mail: string;
    adresse: string;
    status: boolean;
    dateCreate: Date;
    rccm: string;
    idNat: string;
    static fromEntity(snapshot: any): FournisseurModel;
}
