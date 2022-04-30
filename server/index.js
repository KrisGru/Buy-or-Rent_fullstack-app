require('dotenv').config()
const express = require('express');
const { connectDB } = require('./db/mongoose');
const { port } = require('./config');
const apiRouter = require('./routes/api.js');
const cors = require('cors');
//db
require('./db/mongoose.js');

const app = express();
connectDB();
//cors
app.use(cors());
// parsers
//Content-type: application/json
// app.use(bodyParser.json())
app.use(express.json())
//routers
app.use('/api/', apiRouter)
// server
app.listen(port, function() {
  console.log("serwer słucha.... http://localhost:" + port)
})
