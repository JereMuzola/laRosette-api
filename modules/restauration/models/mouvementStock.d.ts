export declare class MouvementStockModel {
    id: number;
    fkStock: string;
    article: string;
    fkArticle: string;
    fkFournisseur: string;
    fkClient: string;
    typeMouvement: string;
    quantite: number;
    prix_unitaire_mouvement: number;
    dateFab: Date;
    dateExp: Date;
    dateCreate: Date;
    fkAgent: string;
    agent: string;
    fkAgence: string;
    agence: string;
    static fromEntity(snapshot: any): MouvementStockModel;
}
