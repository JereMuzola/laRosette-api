export declare class StockArticleModel {
    code: string;
    article: string;
    fkArticle: string;
    quantite: number;
    seuil: number;
    dateCreate: Date;
    status: boolean;
    fkAgent: string;
    static fromEntity(snapshot: any): StockArticleModel;
}
