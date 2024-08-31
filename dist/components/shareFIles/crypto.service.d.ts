export declare class CryptoService {
    private readonly algorithm;
    private readonly key;
    constructor();
    encrypt(text: any): string;
    decrypt(encryptedText: string): string;
}
