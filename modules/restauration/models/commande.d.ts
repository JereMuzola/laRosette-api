import { DetailCommandeModel } from "./detailCommande";
import { BonDeDecaissementModel } from "./toReport/bonDeDecaissement";
import { OrdreDeDecaissementModel } from "./toReport/ordreDeDecaissement";
export declare class CommandeModel {
    code: string;
    montant_total: number;
    dateCreate: Date;
    dateEdit: Date;
    status: boolean;
    fkAgent: string;
    agent: string;
    agence: string;
    fkAgence: string;
    details: DetailCommandeModel[];
    etat: string;
    ordreDeDecaissement: OrdreDeDecaissementModel;
    bonDeDecaissement: BonDeDecaissementModel;
    isAuberge: boolean;
    isTerasse: boolean;
    static fromEntity(snapshot: any): CommandeModel;
}
