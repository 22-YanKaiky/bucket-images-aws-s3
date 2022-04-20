require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('./src/routes');

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
