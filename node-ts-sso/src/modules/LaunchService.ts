import AxiosService from './AxiosService';
import { AxiosRequestConfig } from 'axios';

class LaunchService extends AxiosService {
    constructor() {
        super();
    }

    /**
     * 发射
     */
    public async launch<T = any>(reqConfig: AxiosRequestConfig) {
        try {
            return await this._launch_0<T>(reqConfig);
        } catch (error) {
            await this.sleep(50);
            return await this._launch_1<T>(reqConfig);
        }
    }
    /**
     * 火箭0阶段
     */
    private async _launch_0<T>(reqConfig: AxiosRequestConfig) {
        const axres = await this.ajax<T>(reqConfig);
        return axres;
    }
    /**
     * 火箭1阶段
     */
    private async _launch_1<T>(reqConfig: AxiosRequestConfig) {
        try {
            return await this._launch_0<T>(reqConfig)
        } catch (error) {
            console.error('Code火箭接收失败');
            console.error(error);
            return false;
        }
    }


    /**
     * 等会
     */
    private sleep(duration: number) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, duration);
        });
    }
}

export default LaunchService;
