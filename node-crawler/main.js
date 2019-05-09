const { main, out } = require('./controller/crawler-file');

; (async _ => {

    async function doit() {
        console.time();
        await out();
        // await main();
        console.timeEnd();

        setTimeout(doit, 1000 * 5);
    }

    doit();

     
})();