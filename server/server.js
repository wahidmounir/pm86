const express              = require('express');
const logger               = require('morgan');
const debug                = require('debug')('PM86');
const cookieParser         = require('cookie-parser');
const bodyParser           = require('body-parser');
const session              = require('express-session');
const MongoStore           = require('connect-mongo')(session);
const compression          = require('compression');
const config               = require('./config');
const app                  = express();
const $                    = require('./helpers');
const models               = require('./models');

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', $.config.allow);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression({ threshold: 0 }));

app.use(session({
    secret: $.config.secret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: $.config.sessiondbpath }),
    cookie: { secure: false, httpOnly: false, maxAge: 120 * 60 * 1000 * 100 }
}));

app.use('/api/v1', require('./routers'));
models.connect();


const server = app.listen(3000 , function() {
  require('./websocket')();
  $.debug('Express server listening on port ' + server.address().port);
});
module.exports = app
