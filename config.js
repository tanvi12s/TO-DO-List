require('dotenv').config()

module.exports = {
    dbConfig: {
        url: process.env.DB_HOST,
        db: process.env.DB_DATABASE,
        collection: process.env.DB_COLLECTION,
    },
}