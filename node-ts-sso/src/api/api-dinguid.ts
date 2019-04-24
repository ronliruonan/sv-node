
import TokenService from '../modules/TokenService';
import JWTService from '../modules/JWTService';
import UserService from '../modules/UserService';
import { ResponseBase } from '../base/response.base';
import LogService from '../modules/LogService';

class ApiDingUID {
    protected tokenservice: TokenService;
    protected jwtservice: JWTService;
    protected userservice: UserService;
    constructor() {
        this.tokenservice = new TokenService();
        this.jwtservice = new JWTService();
        this.userservice = new UserService();
    }

    /**
     * 钉钉账号 得到token + user_info + dinguid
     * @param dingUid 钉钉UserId
     */
    public async apiDingUID(dingUid: string, logger: LogService): Promise<ResponseBase> {
        try {
            const getTokenByDUIDTime = new Date();
            const restoken = await this.tokenservice.getTokenByDUID(dingUid, logger);
            logger.methodTimeEnd('getTokenByDUID', getTokenByDUIDTime);

            if (restoken.errcode !== 0) return restoken;

            const decodeTime = new Date();
            const detoken = this.jwtservice.decode(restoken.result, logger);
            logger.methodTimeEnd('decodeJWT', decodeTime);

            if (detoken.errcode !== 0) {
                return detoken;
            }

            const pickUserInfoTime = new Date();
            const pickuserinfo = this.jwtservice.pickUserInfo(detoken.result, logger);
            logger.methodTimeEnd('pickUserInfo', pickUserInfoTime);
            if (pickuserinfo.errcode !== 0) {
                return pickuserinfo;
            }

            const result = {
                'ding_uid': dingUid,
                'access_token': restoken.result,
                'user_info': pickuserinfo.result
            };

            return new ResponseBase(result);
        } catch (error) {
            console.log(error);
            return new ResponseBase(error, 132500, '非常糟糕');
        }
    }

    /**
     * 钉钉账号 得到token + user_info + ding_uid + old_user_info
     * @param dingUid dinguisdr
     */
    public async apiOldUser(dingUid: string, logger: LogService): Promise<ResponseBase> {
        try {
            const apiDingUIDTime = new Date();
            const userinfo = await this.apiDingUID(dingUid, logger);
            logger.methodTimeEnd('apiDingUID', apiDingUIDTime);

            if (userinfo.errcode !== 0) return userinfo;

            const { 'access_token': token, 'user_info': { user_code: user_code } } = userinfo.result;

            const getolduserinfotime = new Date();
            const resOldUserInfo = await this.userservice.GetOldUserInfo(user_code, token, logger);
            logger.methodTimeEnd('GetOldUserInfo', getolduserinfotime);

            if (resOldUserInfo.errcode !== 0) return resOldUserInfo;

            Object.assign(userinfo.result, { 'old_user_info': resOldUserInfo.result });

            return userinfo;
        } catch (error) {
            console.log(error);
            return new ResponseBase(error, 132500, '非常糟糕 001');
        }
    }

    /**
     * 钉钉账号 得到token + user_info + ding_uid + old_user_info
     * @param dingUid dinguisdr
     */
    public async __testApiOldUserToken(dingUid: string, token: string, jar_user_code?: string): Promise<ResponseBase> {
        try {
            const userinfo = await this.apiDingUID(dingUid, undefined);
            if (userinfo.errcode !== 0) return userinfo;

            const { 'user_info': { user_code: user_code } } = userinfo.result;
            console.log('jar_user_code ', jar_user_code);
            console.log('user_code ', user_code);
            console.log('user_info ', userinfo.result['user_info']);

            const resOldUserInfo = await this.userservice.GetOldUserInfo(jar_user_code ? jar_user_code : user_code, token, undefined);
            if (resOldUserInfo.errcode !== 0) return resOldUserInfo;

            Object.assign(userinfo.result, { 'old_user_info': resOldUserInfo.result });

            return userinfo;
        } catch (error) {
            console.log(error);
            return new ResponseBase(error, 132500, '非常糟糕 002');
        }
    }
}

export default ApiDingUID;
