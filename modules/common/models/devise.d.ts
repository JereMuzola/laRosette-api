export declare class DeviseModel {
    code: string;
    description: string;
    symbole: string;
    diminutif: string;
    dateCreate: Date;
    status: boolean;
    static fromEntity(snapshot: any): DeviseModel;
}
