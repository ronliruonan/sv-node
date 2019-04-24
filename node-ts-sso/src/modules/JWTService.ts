/**
 * 1
 */

import { ResponseBase } from '../base/response.base';
import jwt from 'jsonwebtoken';
import LogService from '../modules/LogService';

class JWTService {
    constructor() { }

    /**
     * decode jsonwebtoken
     * @param jwtoken token
     */
    public decode(jwtoken: string, logger: LogService) {
        try {
            if (!jwtoken) return new ResponseBase(undefined, 132500, 'jwtoken无效');
            if (typeof jwtoken !== 'string') return new ResponseBase(jwtoken, 132500, 'jwtoken 非法类型');

            const detoken = jwt.decode(jwtoken, { complete: true });

            if (!detoken) return new ResponseBase(undefined, 132500, 'jwtoken 解析失败');

            return new ResponseBase(detoken);
        } catch (error) {
            console.log(error);
            return new ResponseBase(error, 132500, 'JWTERRCODE26');
        }
    }

    /**
     * 摘取用户信息
     * @param decodeToken decoded token
     */
    public pickUserInfo(decodeToken: any, logger: LogService) {
        // const toutuo = 'pickUserInfo';
        try {
            // logger.enterLog(toutuo);
            if (!decodeToken.payload) new ResponseBase(decodeToken, 132500, 'bad decodeToken');

            // logger.exitLog(toutuo);

            return new ResponseBase({
                'user_name': decodeToken.payload['UserName'],
                'user_code': decodeToken.payload['UserCode'],
                'user_id': decodeToken.payload['UserId'],
            });
        } catch (error) {
            console.log(error);

            return new ResponseBase(error, 132500, 'JWTERRCODE44');
        }
    }
}

export default JWTService;
