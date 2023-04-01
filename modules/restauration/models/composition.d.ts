export declare class CompositionModel {
    id: number;
    fkArticleComposant: string;
    articleComposant: string;
    articleCompose: string;
    fkArticleCompose: string;
    quantite: number;
    dateCreate: Date;
    status: boolean;
    fkAgent: string;
    agent: string;
    static fromEntity(snapshot: any): CompositionModel;
}
