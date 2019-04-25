import ApiDingUID from './api-dinguid';
import DingService from '../modules/DingService';
import { ResponseBase } from '../base/response.base';
import LogService from '../modules/LogService';

class ApiDingCode extends ApiDingUID {
    protected dingservice: DingService;
    constructor() {
        super();
        this.dingservice = new DingService();
    }

    /**
     * 获取钉钉userinfo
     * @param dingcode 钉钉临时授权code
     * @param appkey 钉钉appkey
     */
    public async apiDingCode(dingcode: string, appkey: string, logger: LogService) {
        try {
            const CheckTempCodeTime = new Date();
            const resCheck = await this.dingservice.CheckTempCode(dingcode, appkey, logger);
            logger.methodTimeEnd('CheckTempCode', CheckTempCodeTime);

            return resCheck;
        } catch (error) {
            console.log(error);
            return new ResponseBase(null, 132500, '非常糟糕016');
        }
    }

    public async __test(dinguid: string) {
        const sbres = await this.apiOldUser(dinguid, undefined);
    }
}

export default ApiDingCode;
