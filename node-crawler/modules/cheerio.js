
const
    cheerio = require('cheerio'),
    env = require('../config/env'),
    dw = require('../modules/download');

const baseUri = env.BaseUri;

async function links() {
    // 仅抓取第一页数据
    const html = await dw.DownLoad(baseUri + '/baoding/004/004003/004003003/');
    // 拆分商品房预售许可的链接信息
    const
        $ = cheerio.load(html),
        selectorLi = '#categorypagingcontent .column-list li',
        li商品预售 = $(selectorLi).filter(function (index, ele) {
            const
                tagA = ele.children.find(c => c.type === 'tag' && c.name === 'a'),
                aText = tagA.children.find(c => c.type === 'text').data;

            return aText.includes('商品房预售许可');
        }),
        queue = [];

    // const rex = /([^/]+)\.htm/ig

    // 解析预售证链接信息
    li商品预售.each((index, ele) => {
        const
            tagA = ele.children.find(c => c.type === 'tag' && c.name === 'a'),
            atxt = tagA.children.find(i => i.type === 'text').data,
            aulr = tagA.attribs['href'];
        const
            tagSpan = ele.children.find(i => i.type === 'tag' && i.name === 'span'),
            spantxt = tagSpan.children.find(i => i.type === 'text').data;

        queue.push({ 'date': spantxt, 'title': atxt, 'origanl_url': aulr, 'baseUri': baseUri });
    });

    // 应该入库
    return queue;
}

module.exports.links = links;
