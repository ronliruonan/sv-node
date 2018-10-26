/**
 * MD5 Sha1 哈希算法
 * Hmac + 密钥，哈希算法
 * AES 对称加密算法， 加密解密都是同一个密钥
 * DH算法是一种密钥交换协议, 上面的是加密算法，这个是密钥交换协议
 * RSA 非对称加密算法
 */
const crypto = require('crypto')

// MD5和Sha1
// MD5是一种常用的哈希算法，用户给任意数据一个签名，
const md5 = crypto.createHash('md5')
md5.update('Hello, world!')
md5.update('Hello, nodejs!')
console.log('md5: ', md5.digest('hex'))

const sha1 = crypto.createHash('sha1')
sha1.update('Hello, world!')
sha1.update('Hello, nodejs!')
console.log('sha1: ', sha1.digest('hex'))

const sha256 = crypto.createHash('sha256')
sha256.update('Hello, world!')
sha256.update('Hello, nodejs!')
console.log('sha256: ', sha256.digest('hex'))

// Hmac, 额外需要一个密钥
const hmac = crypto.createHmac('sha256', 'secret-key')
hmac.update('Hello, world!')
hmac.update('Hello, nodejs!')
console.log('hmac: ', hmac.digest('hex'))

//AES 对称加密算法， 加密解密都是同一个密钥
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key)
    var crypted = cipher.update(data, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted;
}
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key)
    var decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted;
}

var data = "Hello, this's a secret message"
var key = 'password'
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key)

console.log('txt: ', data)
console.log('Encrypted txt: ', encrypted)
console.log('Decrypted txt: ', decrypted)


// DH算法是一种密钥交换协议, 上面的是加密算法，这个是密钥交换协议
var ming = crypto.createDiffieHellman(512)
var ming_keys = ming.generateKeys()

var prime = ming.getPrime()
var generator = ming.getGenerator()
console.log('prime: ', prime.toString('hex'))
console.log('Generator: ', generator.toString('hex'))

var hong = crypto.createDiffieHellman(prime, generator)
var hong_keys=hong.generateKeys()

var ming_secret = ming.computeSecret(hong_keys)
var hong_secret = hong.computeSecret(ming_keys)
console.log('ming: ', ming_secret.toString('hex'))
console.log('hong: ', hong_secret.toString('hex'))

// RSA 非对称加密算法
// https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501504929883d11d84a1541c6907eefd792c0da51000
// https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501579966ab03decb0dd246e1a6799dd653a15e1b000
