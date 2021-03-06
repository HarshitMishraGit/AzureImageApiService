var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();//parsing the object to json
const Jimp = require('jimp');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/', jsonParser, (req, res) => {
  const data = req.body;
  console.log(data)
  // res.sendFile('C:/home/site/wwwroot/public/resources/textOverlay.png')
    
  // Reading image
    const image = await Jimp.read('./public/images/background.png');
    // const w=image.m
    const photo=await (await Jimp.read('./public/images/fog.png')).resize(70,90)
   // Defining the text font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    // image.print(font, 200, 200, data.text);
    // image.contain()
   
        image.print(
          font,
          0,
          0,
          {
            text: "data.text",
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
          },
          600,
          450
        ); 
     image.composite(photo,500,70)
   // Writing image after processing
   await image.writeAsync('./public/resources/textOverlay.png');

    console.log("Image is processed succesfully");
   
  // res.send({message:"You have to work hard BTW your sent data is ",data})
  // If you are running it on your localhost then you have to give The exact address of the processed image in resources folder
    res.sendFile('C:/home/site/wwwroot/public/resources/textOverlay.png')
})
// app.use('/users', usersRouter);
app.get('/', (req, res) => {
  res.send("This is fine what about the post request")
})
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

