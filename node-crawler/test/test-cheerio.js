const cheerio = require('cheerio');

const dw = require('../modules/download');

(async () => {
    const
        baseUri = 'http://xzspj.bd.gov.cn',
        html = await dw.download(baseUri + '/baoding/004/004003/004003003/');

    const
        $ = cheerio.load(html),
        selectorLi = '#categorypagingcontent .column-list li',
        li商品预售 = $(selectorLi).filter(function (index, ele) {
            const
                tagA = ele.children.find(c => c.type === 'tag' && c.name === 'a'),
                aText = tagA.children.find(c => c.type === 'text').data;

            return aText.includes('商品房预售许可');
        }),
        queue = new Set();

    li商品预售.each((index, ele) => {
        const
            tagA = ele.children.find(c => c.type === 'tag' && c.name === 'a'),
            atxt = tagA.children.find(i => i.type === 'text').data,
            aulr = tagA.attribs['href'];
        const
            tagSpan = ele.children.find(i => i.type === 'tag' && i.name === 'span'),
            spantxt = tagSpan.children.find(i => i.type === 'text').data;

        queue.add({ 'date': spantxt, 'origanl_url': aulr, 'title': atxt });
    });

    console.log(queue.size);
    for (const iterator of queue.entries()) {
        console.log(iterator);
    }


})(); 
