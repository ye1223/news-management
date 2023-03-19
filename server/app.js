var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// token校验
app.use((req,res,next)=>{

  if(req.url==='/adminapi/user/login'){
    next()
    return
  }
  const token = req.headers['authorization'].split(' ')[1]
  //token有效，next
  if(token){
    const payload = JWT.verify(token)
    //console.log(payload)
    /* {
      _id: '6415cf9bd55e7a4ba145c613',
      username: 'admin',
      iat: 1679210616,
      exp: 1679210626
    } */
    if(payload){
      const newToken = JWT.generate({
        _id:payload._id,
        username:payload.username
      },'1d')
      console.log(newToken ===token)
      res.header('Authorization',newToken)
      next()
    }else{
      res.status(401).send({errorCode:'-1',errorInfo:'token过期'})
    }
  }
  //token过期，返回401错误
})

/* 
  ! adminapi  管理系统的api
  !  webapi   官网api
*/ 
app.use(UserRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
