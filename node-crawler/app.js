const crawler = require('./modules/crawler');

(async () => {
    async function lunta(delay) {
        console.log('怕狗 ', new Date().toLocaleString())
        await crawler.crawler();
        console.log('怕狗 end')

        setTimeout(lunta, delay, delay);
    }

    lunta(1000 * 60 * 60 * 1);
})();