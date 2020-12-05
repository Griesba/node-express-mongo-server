// Require express to use the express framework
var express = require('express');
// Require bodyParser to read the body of requests
var bodyParser = require('body-parser');

module.exports = (function(){

    var app = express();

   


    var promoRouter = express.Router();

    promoRouter.use(bodyParser.json());
// Setup the GET, POST, and DELETE for the root dir
    promoRouter.route('/')
    .all(function(req,res,next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
    })

    .get(function(req,res,next){
            res.end('Will send all the promotions to you!');
    })

    .post(function(req, res, next){
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);    
    })

    .delete(function(req, res, next){
            res.end('Deleting all promotions');
    });

    promoRouter.route('/:promoId')
    .all(function(req,res,next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
    })

    .get(function(req,res,next){
            res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
    })

    .put(function(req, res, next){
            res.write('Updating the promotion: ' + req.params.promoId + '\n');
        res.end('Will update the promotion: ' + req.body.name + 
                ' with details: ' + req.body.description);
    })

    .delete(function(req, res, next){
            res.end('Deleting promotion: ' + req.params.promoId);
    });

    
    return promoRouter;
})();




