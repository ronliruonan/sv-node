import axservice from './AxiosService';
import { ResponseBase } from '../base/response.base';
import { DOTNET_APPCENTER_SERVER_GetOldUser } from '../config/server.config';
import LogService from '../modules/LogService';

class UserService {
    constructor() { }

    public async GetOldUserInfo(javaUserCode: string, token: string, logger: LogService) {
        try {
            if (!token) return new ResponseBase(undefined, 400, 'token无效');

            if (!javaUserCode) return new ResponseBase(undefined, 400, 'newusercode无效');

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

            return new ResponseBase(oldUserInfo);
        } catch (error) {
            console.log(error);
            return new ResponseBase(error, 132500, 'USERERRCODE41--');
        }
    }
}

export default UserService;
