
import { ResponseBase } from '../base/response.base';
import { DOTNET_APPCENTER_SERVER_GetOldUser } from '../config/server.config';
import LogService from '../modules/LogService';
import CacheService from './CacheService';
import LaunchService from './LaunchService';

const cacheService = new CacheService();
const launchService = new LaunchService();

class UserService {
    constructor() { }

    public async GetOldUserInfo(javaUserCode: string, token: string, logger: LogService) {
        try {
            // 1. 发射火箭前期准备
            if (!token) return new ResponseBase(undefined, 400, 'token无效');

            if (!javaUserCode) return new ResponseBase(undefined, 400, 'newusercode无效');

            // 缓存读取
            const existed = cacheService.existed('jarusercode', javaUserCode);
            if (existed) return new ResponseBase(existed['olduser']);

            // 2. 发射
            const axres = await this._launch(javaUserCode, token);
            if (!axres) return new ResponseBase(null, 132500, 'OldUser网络异常[54]');

            // 3. 火箭接收ok
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
            console.error(error);
            return new ResponseBase(null, 132500, 'OldUser网络异常[54]');
        }
    }

    // 火箭
    private async _launch(jarUserCode: string, token: string) {
        const reqConfig = {
            method: 'post',
            url: DOTNET_APPCENTER_SERVER_GetOldUser,
            data: {
                'newUserCode': jarUserCode
            }
        };
        if (token) Object.assign(reqConfig, { headers: { 'Authorization': `Bearer ${token}` } });
        const axres = await launchService.launch(reqConfig);
        return axres;
    }
}

export default UserService;
