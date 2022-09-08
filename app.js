require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const validationErrors = require('./middlewares/errors');
const DEVBASE = require('./config');

const { PORT = 3000, NODE_ENV, DATABASE } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DATABASE : DEVBASE);

app.use(limiter);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(routes);
app.use(errors());
app.use(validationErrors);

app.listen(PORT, () => {});
