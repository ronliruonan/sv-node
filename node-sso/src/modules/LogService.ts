/**
 * Log service on 2019/04/15
 */
import fs from 'fs';
import cuid from 'cuid';
import { LOG_PATH } from '../config/server.config';

class LogService {
    private buffer: any[] = [];
    // private _enterTimes: any[] = [];
    public cuid: string = void 0;
    constructor() {
        this.buffer.push(new Date().getTime());
        this.cuid = cuid();
    }


    public info() {
        try {
            this.buffer.push(new Date().getTime());
            this.buffer.push(this.buffer[this.buffer.length - 1] - this.buffer[0] + ' ms 耗时');
            const data = this.buffer.join('\n');

            this._write(`[info][${this.cuid}]-------${new Date().toLocaleString()}---------\n ${data} \n\n`);
            this._clear();
        } catch (error) {
            console.log(error);
        }
    }

    // public enterLog(msg: string) {
    //     console.log(2323)
    //     const cur = new Date();
    //     this._enterTimes.push({ key: msg, value: cur });
    //     this.push(`[${msg}] 进入: ${cur.toLocaleString()}`);
    //     console.log(this._enterTimes);
    // }
    // public exitLog(msg: string) {
    //     console.log(`1`);
    //     console.log(msg);
    //     const cur = new Date();
    //     const enterTime: Date = this._enterTimes.find(i => i.key === msg);
    //     const haoshi = enterTime ? cur.getTime() - enterTime.getTime() : '异常';

    //     console.log(haoshi);
    //     this.push(`[${msg}] 离开: ${cur.toLocaleString()} 总耗: ${haoshi} ms`);
    // }

    public push(data: string) {
        this.buffer.push(data);
    }

    public methodTimeEnd(methodName: string, startTime: Date) {
        this.push(` - Method: ${methodName}, 耗时: ${new Date().getTime() - startTime.getTime()}ms`);
    }

    private _clear() {
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                const element = this[key];
                if (Array.isArray(element)) element.length = 0;
            }
        }
    }

    private _write(data: string): void {
        const
            date = new Date(),
            date_y = date.getFullYear(),
            date_m = (date.getMonth() + 1 + '').padStart(2, '0'),
            date_d = date.getDate(),
            fileName = `${date_y}${date_m}${date_d}.log`,
            path = `${LOG_PATH}/${date_y}${date_m}`,
            filePath = `${path}/${fileName}`;

        fs.exists(path, (existed) => {
            if (!existed) {
                fs.mkdir(path, (err) => {
                    if (err) return;

                    fs.appendFile(filePath, data, _ => { });
                });
            } else {
                fs.appendFile(filePath, data, _ => { });
            }
        });

        // if (!fs.existsSync(path)) {
        //     fs.mkdirSync(path);
        // }

        // fs.appendFile(filePath, data, _ => { });
    }
}

export default LogService;
