var createError = require('http-errors');
const bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors =require('cors');
var logger = require('morgan');
var morgan = require('morgan');
var infologger=require("./logger");
require("dotenv").config();

var didRouter=require('./routes/did');
var webRtcRouter=require('./routes/web_rtc');
var sipRouter=require('./routes/sip');
var clickToCallRouter=require('./routes/click_to_call');
var winston = require('./config/winston');

var app = express();
app.use(morgan('combined', { stream: winston.stream }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
 });  
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:100000000}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/click_to_call',clickToCallRouter);
app.use('/web_rtc',webRtcRouter);
app.use('/did',didRouter);
app.use('/sip',sipRouter);

app.get('/', function (req, res) {``
res.send('Wellcome to bpo.do api!!')
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');
})

app.use((req, res, next) => {
  infologger.info(req.body);
  let oldSend = res.send;
  res.send = function (data) {
    infologger.info(JSON.parse(data));
    oldSend.apply(res, arguments);
  }
  next();
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  infologger.log('info',`server up and running on PORT : ${port}`);
  print(`server up and running on PORT : ${port}`);
});
module.exports = app;

// ENSWITCH_USER=QA_user2
// ENSWITCH_PASSWORD=c9x8z7a6