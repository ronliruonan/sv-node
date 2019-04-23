import LogService from '../src/modules/LogService';

(() => {
    const service = new LogService();
    const sobj = {
        error: 0
    };

    console.log(sobj);
    console.log(service.objToStr(sobj));
})();