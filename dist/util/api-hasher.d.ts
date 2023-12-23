interface IHasher {
    apiKey: string;
    data: any;
    params: any;
}
export declare const generateAPIHash: (data: IHasher) => any;
export declare const validateAPIHash: (data: IHasher, apiHash: string) => boolean;
export {};
