module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:xxx/atrios-node-api',
  tokenSecret: process.env.TOKEN_SECRET || 'secret'
}
