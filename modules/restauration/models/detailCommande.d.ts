export declare class DetailCommandeModel {
    id: number;
    fkArticle: string;
    article: string;
    fkFournisseur: string;
    fournisseur: string;
    fkCommande: string;
    prix_unitaire: number;
    quantite: number;
    static fromEntity(snapshot: any): DetailCommandeModel;
}
