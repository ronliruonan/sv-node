/**
 * check 钉钉用户ID
 */

import { ResponseBase } from '../base/response.base';
import { SSO_JAVA_SERVER_GetDingToken } from '../config/server.config';
import LogService from '../modules/LogService';
import CacheService from './CacheService';
import LaunchService from './LaunchService';

const cacheService = new CacheService();
const launchService = new LaunchService();

class AccessTokenService {
    private _random = Math.random();
    constructor() {
        this._random = 10 * this._random;
    }

    /**
     * 根据DUID获取AccessToken
     * @param duid 钉钉UserId
     */
    public async getTokenByDUID(duid: string, logger: LogService) {
        try {
            // 1. 发射前期检查
            if (!duid) return new ResponseBase(undefined, 400, 'DUID无效');

            // 2. 缓存火箭
            const existed = cacheService.existed('duid', duid);
            if (existed) return new ResponseBase(existed.token);

            // 3. 发射请求
            const axres = await this._launch<string>(duid);
            if (!axres) return new ResponseBase(null, 132500, 'Token网络异常[21]');

            // 4. 火箭接收成功
            const { status, data } = axres;

            // 填入缓存
            cacheService.push('duid', duid, 'token', data);

            if (status !== 200)
                return new ResponseBase(undefined, status, `Failed Get Token001:${axres.statusText}`);

            if (!data)
                return new ResponseBase(data, 404, `Failed Get Token002[无此用户]:${data}`);

            return new ResponseBase(data);
        } catch (error) {
            console.error(error.response);
            return new ResponseBase(null, 132500, 'Token网络异常[52]');
        }
    }

    // 火箭发射
    private async _launch<T>(duid: string) {
        const reqConfig = {
            method: 'get',
            url: `${SSO_JAVA_SERVER_GetDingToken}/${duid}`,
        };
        const sbres = await launchService.launch<T>(reqConfig);
        return sbres;
    }
}

export default AccessTokenService;
