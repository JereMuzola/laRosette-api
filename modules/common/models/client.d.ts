export declare class ClientModel {
    code: string;
    nom: string;
    postnom: string;
    prenom: string;
    status: boolean;
    dateCreate: Date;
    sexe: string;
    tel: string;
    adresse_mail: string;
    nationalite: string;
    piece_identite: string;
    num_piece_identite: string;
    adresse: string;
    etat: string;
    profession: string;
    provenance: string;
    destination: string;
    etat_civil: string;
    date_de_naissance: Date;
    lieu_de_naissance: string;
    clientResponsable?: string;
    fkAgence: string;
    agence: string;
    motifVoyage: string;
    isAdult: boolean;
    fkClientResponsable: string;
    static fromEntity(snapshot: any): ClientModel;
}
