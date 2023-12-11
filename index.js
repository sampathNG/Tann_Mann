const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const env = require('./config.js')
const mongoose = require('mongoose')
async function db_connection(){
    try {
        await mongoose.connect(env.db_url)
        console.log('connection to database success')
    } catch (error) {
        console.log(error)
    }
}
db_connection()
app.get('/', (req, res) => res.send('hello world'))
const routes = require('./routes/routes.js')
app.use(routes)
app.listen(env.port, () => console.log(`server running on port ${env.port}`))