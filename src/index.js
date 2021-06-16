/**
 * The node application starter, starts up the express backend app
 * listening to port 9000 for incoming http requests
 */
const app = require('./app')

app.listen(process.env.PORT,() => {
    console.log('server started at 9000')
})