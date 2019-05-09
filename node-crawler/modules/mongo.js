const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://192.168.1.90:27017/sunny88';

function baseConnect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) return reject(err);

            const dbo = db.db('sunny88');

            return resolve({ dbo, db });

            // test , never be used
            dbo.collection('asd').find()
        });
    });
}

async function insertMany(arr) {
    const { dbo, db } = await baseConnect();

    return new Promise((resolve, reject) => {
        dbo.collection('links').insertMany(arr, function (err, res) {
            if (err) return reject(err);
            resolve(res);
            db.close();
        })
    });

}
async function saveWithouClose(obj) {
    const { dbo, db } = await baseConnect();

    return new Promise((resolve, reject) => {
        dbo.collection('links').save(obj, function (err, res) {
            if (err) {
                db.close();
                return reject(err);
            }

            resolve({ res, db });
        })
    });

}
async function query(query = {}) {
    const { dbo, db } = await baseConnect();

    return new Promise((resolve, reject) => {
        dbo.collection('links').find(query, function (err, res) {
            if (err) return reject(err);

            res.toArray(function (err, result) {
                if (err) return reject(err);
                resolve(result);
            });
            db.close();
        })
    });
}

async function queryWithoutClose(query = {}) {
    const { dbo, db } = await baseConnect();

    return new Promise((resolve, reject) => {
        dbo.collection('links').find(query, function (err, res) {
            if (err) {
                db.close();
                return reject(err);
            }

            res.toArray(function (err, res) {
                if (err) return reject(err);
                resolve({ res, db });
            });
        })
    });
}

module.exports.insertMany = insertMany;
module.exports.saveWithouClose = saveWithouClose;
module.exports.query = query;
module.exports.queryWithoutClose = queryWithoutClose;

// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;

//     const dbo = db.db('sunny88');


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