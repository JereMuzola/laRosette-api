export declare class CategorieChambreModel {
    code: string;
    description: string;
    prix: number;
    status: boolean;
    dateCreate: Date;
    static fromEntity(snapshot: any): CategorieChambreModel;
}
