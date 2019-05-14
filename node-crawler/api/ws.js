/**
 * 
 */
const mongo = require('../modules/mongo');

/**
 * @returns Object {res, db}
 */
async function showWithoutDbClose() {
    const { res, db } = await mongo.queryWithoutClose();

    if (!Array.isArray(res)) return db.close();

    return { res, db };
}
/**
 * @returns Object res
 */
async function show() {
    const res = await mongo.query();

    if (!Array.isArray(res)) return;

    return res;
}

module.exports.showWithoutDbClose = showWithoutDbClose;
module.exports.show = show;
