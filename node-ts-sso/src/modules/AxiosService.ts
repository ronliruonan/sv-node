import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

class AxiosService {
    private _config: AxiosRequestConfig = {
        // timeout: 1000 * 10
    };
    constructor() { }

    public ajax<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
        Object.assign(this._config, config);

        return axios(this._config);
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        Object.assign(this._config, config);
        return axios.get<T>(url, config);
    }

    // get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    // delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
    // head(url: string, config?: AxiosRequestConfig): AxiosPromise;
    // post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    // put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    // patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}

// const axlaunch = new AxiosService();


export default AxiosService;
