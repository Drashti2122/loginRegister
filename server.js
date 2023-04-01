const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000
const api = require('./routes/api')
const app = express();
app.use(cors({ origin: '*' }))

// app.use(cors({
//     origin: 'http://localhost:4200/'
// }));

app.use(bodyParser.json())

app.use('/api', api)
app.get('/', function (res, res) {
    res.send("Hello from server")
})

app.listen(PORT, function () {
    console.log("Server running on localhost:" + PORT)
})

// mongodb+srv://NasaAPI:drashti@nasaapi.8lexktk.mongodb.net/authAngular?retryWrites=true&w=majority