export declare class Encryptor {
    static salt: number;
    static encrypt(password: string): Promise<any>;
    static decrypt(password: string, hashedPassword: any): Promise<boolean>;
}
