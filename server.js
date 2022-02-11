const express =require('express');
const path = require('path');
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config('.env')

// Db config
require('./config/db');



const app = express();
connectDB();


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



// server
const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));