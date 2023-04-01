export declare class DetailAchatModel {
    id: number;
    fkArticle: string;
    article: string;
    fkFournisseur: string;
    fournisseur: string;
    fkAchat: string;
    prix_unitaire: number;
    quantite: number;
    static fromEntity(snapshot: any): DetailAchatModel;
}
