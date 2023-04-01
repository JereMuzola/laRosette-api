export declare class ClientModel {
    code: string;
    nom: string;
    postnom: string;
    prenom: string;
    tel: string;
    adresse_mail: string;
    nationalite: string;
    piece_identite: string;
    num_piece_identite: string;
    adresse: string;
    etat: string;
    fkClientResponsable: string;
    sexe: string;
    provenance: string;
    destination: string;
    status: boolean;
    dateCreate: DataTransfer;
    static fromEntity(snapshot: any): ClientModel;
}
