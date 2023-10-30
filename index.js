const express = require('express')
const router = require('./routes/route')
const bodyParser = require('body-parser')
const cors = require('cors')
const connection = require('./DB/connection')


const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
connection();

app.listen(5000, () => console.log('Server running on port 5000'))