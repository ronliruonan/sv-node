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
        queue = [];
    const rex = /([^/]+)\.htm/ig;

    li商品预售.each((index, ele) => {
        const
            tagA = ele.children.find(c => c.type === 'tag' && c.name === 'a'),
            atxt = tagA.children.find(i => i.type === 'text').data,
            aulr = tagA.attribs['href'];
        const
            tagSpan = ele.children.find(i => i.type === 'tag' && i.name === 'span'),
            spantxt = tagSpan.children.find(i => i.type === 'text').data;

        queue.push({ 'date': spantxt, 'origanl_url': aulr, 'title': atxt });
    });

    console.log(queue);

    const
        detailHtml = await dw.download(baseUri + queue[0]['origanl_url']),
        $detail = cheerio.load(detailHtml),
        $tr = $detail('table tr')

    let s = ($tr.text())
    
    console.log(s.includes('向阳美域'));
    console.log(typeof s);
    console.log(s.toString().indexOf('向阳美域'))


    // console.log($sp[0].children.find(i=>i.type==='text')['data']);
    // console.log($sp[1].children.find(i=>i.type==='text')['data']);
    // console.log($sp[2].children.find(i=>i.type==='text')['data']);
    // console.log($sp[3].children.find(i=>i.type==='text')['data']);
    // console.log($sp[4].children.find(i=>i.type==='text')['data']);
    // console.log($sp[5].children.find(i=>i.type==='text')['data']);
    // console.log($sp[6].children.find(i=>i.type==='text')['data']);
    // console.log($sp[7].children.find(i=>i.type==='text')['data']);



})(); 
