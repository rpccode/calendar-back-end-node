const express = require('express');
const { dbConnection } = require('./src/DB/config');
const cors = require('cors')
require('dotenv').config();

const app = express()

dbConnection()
const port = process.env.PORT || 4000


app.use(cors())
//? Directorio publico 
app.use(express.static('public'))
app.use(express.json());



app.use('/api/auth', require('./src/router/auth'))
app.use('/api/events', require('./src/router/events'))


app.listen(port, () => console.log(` app listening on port ${port}!`))