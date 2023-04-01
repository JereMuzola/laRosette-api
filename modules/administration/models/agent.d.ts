import { ServiceModel } from "./service";
export declare class AgentModel {
    code: string;
    nom: string;
    adresse: string;
    postnom: string;
    fonction: string;
    isGerant: boolean;
    prenom: string;
    sexe: string;
    telephone: string;
    mail: string;
    etat_civil: string;
    province_origine: string;
    district_origine: string;
    territoire_origine: string;
    secteur_origine: string;
    groupement_origine: string;
    village_origine: string;
    lieu_naissance: string;
    date_naissance: Date;
    fkAgence: string;
    fkService: string;
    status: boolean;
    dateCreate: Date;
    agence?: any;
    service?: ServiceModel;
    static fromEntity(snapshot: any): AgentModel;
}
