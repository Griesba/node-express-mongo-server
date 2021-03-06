var express = require('express');
var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');
var http = require('http');
var morgan = require('morgan');
var hostname = 'localhost';
var port = 3000;

var app = express();
app.use(morgan('dev'));
app.use(function(req, res, next){
	res.writeHead(200,{'Content-Type':'text/html'});
	addRouters(req,res);
	next();	
});

function addRouters(req,res, next){
	dishRouter(req, res, next, function(err, dishRouter){
	if(err){
		console.log(err);
	}
	else{		
			app.use('/dishes', dishRouter);
	}
	}
	);


};
app.use(express.static(__dirname+'/public'));
app.listen(port, hostname, function(){
console.log(`Server running at http://${hostname}:${port}`);
});
