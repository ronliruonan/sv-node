/**
 * check 钉钉用户ID
 */

import { ResponseBase } from '../base/response.base';
import { SSO_JAVA_SERVER_GetDingToken } from '../config/server.config';
import axservice from '../modules/AxiosService';
import LogService from '../modules/LogService';

class AccessTokenService {
    constructor() { }

    /**
     * 根据DUID获取AccessToken
     * @param duid 钉钉UserId
     */
    public async getTokenByDUID(duid: string, logger: LogService) {
        try {
            if (!duid) return new ResponseBase(undefined, 400, 'DUID无效');

            // 发射请求
            const axres = await axservice.get<string>(`${SSO_JAVA_SERVER_GetDingToken}/${duid}`);
            const { status, data } = axres;

            if (status !== 200)
                return new ResponseBase(undefined, status, `Failed Get Token001:${axres.statusText}`);

            if (!data)
                return new ResponseBase(data, 404, `Failed Get Token002[无此用户]:${data}`);

            return new ResponseBase(data);
        } catch (error) {
            console.log(error);
            return new ResponseBase(error, 132500, 'TOKENERRCODE32');
        }
    }
}

export default AccessTokenService;
