const http = require('http');

function download(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let data = '';
            res.on('data', chunk => {
                data = data + chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', err => {
            reject(err);
        });
    });

}

exports.download = download;
