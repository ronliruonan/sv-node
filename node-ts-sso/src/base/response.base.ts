export class ResponseBase {
    public errcode: number;
    public errmsg: string;
    public result: any;

    constructor(result: any = undefined, errcode = 0, errmsg = 'ok') {
        this.errcode = errcode;
        this.errmsg = errmsg;
        this.result = result;
    }
}