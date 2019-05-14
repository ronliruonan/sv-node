const cheerio = require('cheerio');

const module_cheerio = require('../modules/cheerio');
const module_dw = require('../modules/download');


function mapNoDetail(ele, index = 0, array = []) {
    return new Promise(async (resolve, reject) => {
        const
            html = await module_dw.DownLoad(ele.baseUri + ele.origanl_url),
            $detail = cheerio.load(html),
            $tr = $detail('table tr'),
            detail = [];

        digui($tr.first(), detail);

        Object.assign(ele, { detail: JSON.stringify(detail) });
        resolve();
    });
}
function digui(tr, arr = []) {
    if (tr.length === 0) return;

    arr.push(tr.text().match(/\S+/g));
    digui(tr.next(), arr);
}
async function main() {
    try {
        // 1. 获取第一页链接信息
        const resLinks = await module_cheerio.links();

        // 2. 处理结果：非数组，空数组
        if (!Array.isArray(resLinks)) return;
        if (resLinks.length < 1) return;

        // 3. 预处理detail信息
        const detailPromises = resLinks.map(mapNoDetail);

        // 4. 处理结束
        await Promise.all(detailPromises);

        // 5. 入file; resLinks为最新数据，因为item为object
        const { writeFile } = require('../base/opFs');

        await writeFile('crawler.sv', JSON.stringify(resLinks));
    } catch (error) {
        throw error;
    }
}

async function out() {
    try {
        const { readFile } = require('../base/opFs');
        const result = await readFile('crawler.sv');

        return result;
    } catch (error) {
        throw error;
    }

}


module.exports.main = main;
module.exports.out = out;
