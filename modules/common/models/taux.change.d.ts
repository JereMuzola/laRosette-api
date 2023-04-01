export declare class TauxChangeModel {
    code: string;
    taux: number;
    fkDeviseOrigine: string;
    deviseOrigine: string;
    fkDeviseDestination: string;
    deviseDestination: string;
    dateCreate: Date;
    status: boolean;
    fkAgent: string;
    agent: string;
    static fromEntity(snapshot: any): TauxChangeModel;
}
