class CacheService {
    private _caches: any[];
    private _starTime: number;

    private _duration: number;
    private _cacheCount: number;

    constructor(_duration: number = 1000 * 11, cacheCount = 100) {
        this._caches = [];
        this._starTime = Date.now();
        this._duration = _duration;
        this._cacheCount = cacheCount;
    }


    public push(key: string, keyval: any, vkey: string, vval: any) {
        this.availableCache();

        const existed = this._caches.find(i => i[key] === keyval);
        if (existed) return existed[vkey] = vval;

        const obj = {};
        Object.defineProperty(obj, key, {
            writable: true,
            enumerable: true,
            value: keyval
        });
        Object.defineProperty(obj, vkey, {
            writable: true,
            enumerable: true,
            value: vval
        });
        this._caches.push(obj);
    }

    public existed(key: string, keyval: any) {
        this.availableCache();

        // console.log(this._caches.length);
        // console.log(this._caches);
        return this._caches.find(i => i[key] === keyval);
    }

    private availableCache() {
        const boollength = this._caches.length >= this._cacheCount;
        if (boollength) return this.clearCaches();

        const boolduration = Date.now() - this._starTime >= this._duration;
        if (boolduration) return this.clearCaches();
    }

    private clearCaches(): void {
        this._caches.length = 0;
        this._starTime = Date.now();
    }
}

export default CacheService;
