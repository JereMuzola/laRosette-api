export declare class TableModel {
    code: string;
    designation: string;
    status: boolean;
    dateCreate: Date;
    fkAgent: string;
    agent: string;
    agence: string;
    fkAgence: string;
    static fromEntity(snapshot: any): TableModel;
}
