/**
 * mongoose connectivity set up for connecting with backend mongoDB
 * connection strings are externalised to config env files
 */
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})