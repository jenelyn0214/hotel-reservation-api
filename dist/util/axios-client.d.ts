export declare class AxiosClient {
    protected BaseURL: string;
    constructor(BaseURL: string);
    init: () => import("axios").AxiosInstance;
}
