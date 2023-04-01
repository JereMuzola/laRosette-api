export declare class DetailFactureRestaurentModel {
    id: number;
    fkFactureRestaurent: string;
    fkArticle: string;
    article: string;
    prix_unitaire: number;
    quantite: number;
    static fromEntity(snapshot: any): DetailFactureRestaurentModel;
}
