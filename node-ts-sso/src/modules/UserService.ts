import axservice from './AxiosService';
import { ResponseBase } from '../base/response.base';
import { DOTNET_APPCENTER_SERVER_GetOldUser } from '../config/server.config';
import LogService from '../modules/LogService';
import CacheService from './CacheService';

const cacheService = new CacheService();

class UserService {
    constructor() { }

    public async GetOldUserInfo(javaUserCode: string, token: string, logger: LogService) {
        try {
            if (!token) return new ResponseBase(undefined, 400, 'token无效');

            if (!javaUserCode) return new ResponseBase(undefined, 400, 'newusercode无效');

            // 缓存读取
            const existed = cacheService.existed('jarusercode', javaUserCode);
            if (existed) return new ResponseBase(existed['olduser']);

            const reqConfig = {
                method: 'post',
                url: DOTNET_APPCENTER_SERVER_GetOldUser,
                data: {
                    'newUserCode': javaUserCode
                }
            };

            if (token) Object.assign(reqConfig, { headers: { 'Authorization': `Bearer ${token}` } });

            const axres = await axservice.launch(reqConfig);

            const { status, data } = axres;

            if (status !== 200) {
                return new ResponseBase(undefined, status, `Failed Get OldUser 001: ${axres.statusText}`);
            }

            if (!data) {
                return new ResponseBase(data, 404, `Failed Get OldUser 002: ${data}`);
            }

            const { result: { item: oldUserInfo } } = data;
            if (!oldUserInfo) {
                return new ResponseBase(data, 404, `Failed Get OldUser 002: ${data}`);
            }

            // 填入缓存
            cacheService.push('jarusercode', javaUserCode, 'olduser', data);

            return new ResponseBase(oldUserInfo);
        } catch (error) {
            console.log(error);
            return new ResponseBase(null, 132500, 'OldUser网络异常[54]');
        }
    }
}

export default UserService;
