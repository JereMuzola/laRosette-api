import { CompositionModel } from "./composition";
import { StockArticleModel } from "./stockArticle";
export declare class ArticleModel {
    code: string;
    designation: string;
    description: string;
    isArticle: boolean;
    isDisponible: boolean;
    isCompose: boolean;
    type: string;
    prix_unitaire_vente: number;
    status: boolean;
    dateCreate: Date;
    fkAgent: string;
    agence: string;
    devise: string;
    fkDevise: string;
    fkAgence: string;
    stockArticle: StockArticleModel;
    composant: CompositionModel[];
    static fromEntity(snapshot: any): ArticleModel;
}
