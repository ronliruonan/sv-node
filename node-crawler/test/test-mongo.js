const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://192.168.1.90:27017/sunny88';

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;

    const dbo = db.db('sunny88');
    // dbase.createCollection('test', function (err, res) {
    //     if (err) throw err;
    //     console.log('collection is ready');
    //     db.close();
    // })

    dbo.collection('test')
        .save({ name: '大傻子6203' }, function (err, res) {

            if (err) throw err;
            console.log('insert one successfully');
        });

    dbo.collection('test').find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });

})