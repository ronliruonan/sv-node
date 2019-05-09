const mongo = require('./modules/mongo');
const dw = require('./modules/download');
const cheerio = require('cheerio');

async function todo() {
    // 1. 获取新狗 db.links.find(detail:{$exists:false});
    const noDetails = await mongo.query({ detail: { $exists: false } });


    // 2. 获取detail
    if (!Array.isArray(noDetails)) return;
    if (noDetails.length === 0) return;


    const promises = noDetails.map(mapNoDetail);

    return Promise.all(promises);
}

function mapNoDetail(ele, index = 0, array = []) {
    return new Promise(async (resolve, reject) => {
        try {
            const
                detailHtml = await dw.DownLoad(ele.baseUri + ele.origanl_url),
                $detail = cheerio.load(detailHtml),
                $tr = $detail('table tr'),
                detail = [];

            digui($tr.first(), detail);

            Object.assign(ele, { detail: JSON.stringify(detail) });
            const { res, db } = await mongo.saveWithouClose(ele);

            if (index === array.length - 1) {
                db.close();
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function digui(tr, arr = []) {
    if (tr.length === 0) return;

    arr.push(tr.text().match(/\S+/g));
    digui(tr.next(), arr);
}


; (async () => {
    async function lunta(delay) {
        try {
            console.log('狗', new Date().toLocaleString());
            const sv = await todo();
            console.log(sv);
            console.log('狗down')
        } catch (error) {
            console.log(error);
        }
        setTimeout(lunta, delay, delay);
    }

    lunta(1000 * 60 * 60 * 1);
})();

