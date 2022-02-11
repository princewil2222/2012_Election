const express =require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');


// Db config
require('./config/db');


const app = express();

const poll = require('./routes/poll');

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Enable Cors
app.use(cors());

app.use('/poll', poll)

app.use('/', router)

const port = 3000;

// server
app.listen(port, () => console.log(`Server is running on port ${port}`));