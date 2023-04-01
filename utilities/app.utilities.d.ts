export declare class AppUtilities {
    static uniqArray(array: any[]): any[];
    static controlValueNumber(value: number, message: string): any;
    static controlValueString(value: string, message: string): any;
    static controlValueList(value: any[], message: string): any;
    static escapeSpecialChar(s: string): string;
    static convertStringToStringDate(s: string): string;
    static convertDateToStringddMMyyyy(date: Date): string;
    static addDays(date: Date, days: number): Date;
}
