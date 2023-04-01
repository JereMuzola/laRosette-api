import { DetailVenteModel } from "./detailVente";
import { factureRestaurentModel } from "./factureRestaurent";
export declare class VenteModel {
    code: string;
    dateCreate: Date;
    typeVente: string;
    fkTable: string;
    designation_table: string;
    nombre_personne: number;
    fkClient: string;
    client: string;
    montant_total: number;
    fkAgence: string;
    agence: string;
    fkAgent: string;
    agent: string;
    status: boolean;
    details: DetailVenteModel[];
    isPaid: boolean;
    facture: factureRestaurentModel;
    venteService: string;
    static fromEntity(snapshot: any): VenteModel;
}
