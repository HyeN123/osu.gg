const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

let app = express();

const MONGO_DB = process.env.MONGO_DB;

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(MONGO_DB);

let db = mongoose.connection;

db.once('open', function(){
    console.log('DB Connected');
})

db.on('error', function(err){
    console.log('DB ERROR : ', err);
})

app.set('port', (process.env.PORT) || 3331);

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const baseRouter = require('./routers/commonRouter.js');
app.use('/', baseRouter);

const loginRouter = require('./routers/loginRouter.js');
app.use('/login', loginRouter);

const userInfoRouter = require('./routers/userinfoRouter.js');
app.use('/user', userInfoRouter);

let server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log(`Express 엔진이 ${app.get('port')}에서 실행중`);
});