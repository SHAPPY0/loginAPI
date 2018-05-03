const express 		   = require('express');
const bodyParser 	   = require('body-parser');
const logger 		   = require('morgan');
const path 			   = require('path');
const errorHandler     = require('errorhandler');
const app 			   = express();
const server 		   = require('http').createServer(app);
const errorFn          = require('./routes/error');

app.use(logger('dev'));

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '100mb'}));

app.use(errorFn);
app.set('env','development')  ;  
app.use(express.static(path.join(__dirname, '/')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
 //devlopment config
if(app.get('env') === 'development') {
    app.use(errorHandler());
}
require('./routes')(app);
  
console.log(app.get('port'))
server.on('error', function(err){
	process.exit(1);
}).listen(app.get('port'), function(){
	console.log('App is running at:'+ app.get('port'));
});

module.exports = app;