require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const ownerRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productsRouter');
const index = require('./routes/indexroutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/owners', ownerRouter);
app.use('/users', usersRouter);  // This should correctly register the /users routes
app.use('/products', productsRouter);
app.use('/', index);

app.listen(3000);
