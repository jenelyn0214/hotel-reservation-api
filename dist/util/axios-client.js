"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosClient = void 0;
const axios_1 = __importDefault(require("axios"));
class AxiosClient {
    constructor(BaseURL) {
        this.init = () => {
            console.log('BASE_URL', this.BaseURL);
            const axiosClient = axios_1.default.create({
                baseURL: this.BaseURL,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            axiosClient.interceptors.response.use(function (response) {
                return response;
            }, function (error) {
                const res = error.response;
                console.error(error);
                console.error('Looks like there was a problem. Status Code: ' + res.status);
                return Promise.reject(error);
            });
            axiosClient.interceptors.request.use(async (config) => {
                return config;
            }, (error) => {
                Promise.reject(error);
            });
            return axiosClient;
        };
        this.BaseURL = BaseURL;
    }
}
exports.AxiosClient = AxiosClient;
//# sourceMappingURL=axios-client.js.map