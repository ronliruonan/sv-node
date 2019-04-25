/**
 * check 钉钉用户ID
 */

import { ResponseBase } from '../base/response.base';
import { SSO_JAVA_SERVER_GetDingToken } from '../config/server.config';
import axservice from '../modules/AxiosService';
import LogService from '../modules/LogService';
import CacheService from './CacheService';

const cacheService = new CacheService();

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
            if (!duid) return new ResponseBase(undefined, 400, 'DUID无效');

            const existed = cacheService.existed('duid', duid);

            if (existed) return new ResponseBase(existed.token);

            // 发射请求
            const axres = await axservice.get<string>(`${SSO_JAVA_SERVER_GetDingToken}/${duid}`);
            const { status, data } = axres;

            // 填入缓存
            cacheService.push('duid', duid, 'token', data);

            if (status !== 200)
                return new ResponseBase(undefined, status, `Failed Get Token001:${axres.statusText}`);

            if (!data)
                return new ResponseBase(data, 404, `Failed Get Token002[无此用户]:${data}`);

            return new ResponseBase(data);
        } catch (error) {
            console.log(error.response);
            return new ResponseBase(null, 132500, 'Token网络异常[52]');
        }
    }
}

export default AccessTokenService;
