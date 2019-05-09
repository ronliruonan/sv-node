const cheerio = require('./cheerio');
const mongo = require('./mongo');


async function crawler() { 
  
    try {
        // 1. 获取链接信息
        const resLinks = await cheerio.links();

        // 2. 处理结果：非数组，空数组
        if (!Array.isArray(resLinks)) return;
        if (resLinks.length < 1) return;

        // 3. 匹配mongodb中没有的数据
        const
            query_in = resLinks.map(function (value, index, array) {
                const temp = value['origanl_url'];
                if (temp) {
                    return temp;
                }
            }),
            resQuery = await mongo.query({ "origanl_url": { $in: query_in } });

        const gousheng = resLinks.filter(function (element, index, array) {
            const existed = resQuery.some(item => item['origanl_url'] === element['origanl_url']);
            return !existed;
        });

        // 4. 狗剩入库
        if (Array.isArray(gousheng) && gousheng.length > 0) {
            const res = await mongo.insertMany(resLinks);
            console.info('新狗入库', res.result);
        } else {
            console.info('新狗入库', 0);
        }
    } catch (error) {
        throw error;
    }
}

module.exports.crawler = crawler;

// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;

//     const dbo = db.db('sunny88');
//     // dbase.createCollection('test', function (err, res) {
//     //     if (err) throw err;
//     //     console.log('collection is ready');
//     //     db.close();
//     // })

//     dbo.collection('test')
//         .save({ name: '大傻子6203' }, function (err, res) {

//             if (err) throw err;
//             console.log('insert one successfully');
//         });

//     dbo.collection('test').find().toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });

// });