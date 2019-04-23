/**
 * Log service on 2019/04/15
 */
import fs from 'fs';
import cuid from 'cuid';
import { LOG_PATH } from '../config/server.config';

class LogService {
    private _types = ['info', 'error', 'warn'];
    private _buffer: any[] = [];
    public cuid: string = void 0;
    constructor() {
        this._buffer.push(new Date().getTime());
        this.cuid = cuid();
    }


    public info() {
        this._end();
    }

    public endErr() {
        this._end(1);
    }

    public objToStr(obj: any): string {
        try {
            return this._objstr(obj).join();
        } catch (error) {
            return `objToStr Error: ${JSON.stringify(error)}`;
        }
    }

    /**
     * Obj 对象
     * @param obj 对象
     * @param results 结果
     */
    private _objstr(obj: any, results: string[] = []): string[] {
        if (typeof obj !== 'object') return results;

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const item = obj[key];
                if (typeof item === 'string' || typeof item === 'number') {
                    results.push(`${key}:${item}`);
                } else {
                    results.concat(this._objstr(item, results));
                }
            }
        }

        return results;
    }

    public push(data: string) {
        this._buffer.push(data);
    }

    /**
     * 计时器结束
     * @param methodName 自己标识
     * @param startTime 开始时间
     */
    public methodTimeEnd(methodName: string, startTime: Date) {
        this.push(` - Method: ${methodName}, 耗时: ${new Date().getTime() - startTime.getTime()}ms`);
    }

    private _end(type: number = 0) {
        try {
            this._buffer.push(new Date().getTime());
            this._buffer.push(this._buffer[this._buffer.length - 1] - this._buffer[0] + ' ms 耗时');
            const data = this._buffer.join('\n');

            this._write(`[${this._types[type]}][${this.cuid}]-------${new Date().toLocaleString()}---------\n ${data} \n\n`, type);
            this._clear();
        } catch (error) {
            console.log(error);
        }
    }
    private _clear() {
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                const element = this[key];
                if (Array.isArray(element)) element.length = 0;
            }
        }
    }

    private _write(data: string, type: number = 0): void {
        const
            date = new Date(),
            date_y = date.getFullYear(),
            date_m = (date.getMonth() + 1 + '').padStart(2, '0'),
            date_d = date.getDate(),
            fileName = `${date_y}${date_m}${date_d}_${this._types[type]}.log`,
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
