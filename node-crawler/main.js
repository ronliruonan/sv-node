const { main, out } = require('./controller/crawler-file');

; (async _ => {

    async function doit() {
        console.time();
        await main();
        console.timeEnd();
        console.log(new Date().toISOString())
        setTimeout(doit, 1000 * 60 * 60 * 3);
    }

    doit();


})();