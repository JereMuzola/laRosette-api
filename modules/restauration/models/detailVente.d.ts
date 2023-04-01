export declare class DetailVenteModel {
    id: number;
    fkVente: string;
    fkArticle: string;
    article: string;
    prix_unitaire: number;
    quantite: number;
    static fromEntity(snapshot: any): DetailVenteModel;
}
