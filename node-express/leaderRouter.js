var express = require('express');

var bodyParser = require('body-parser');

module.exports = (function(){

    var app = express();

   


    var leaderRouter = express.Router();

    leaderRouter.use(bodyParser.json());

    leaderRouter.route('/')
    .all(function(req,res,next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
    })

    .get(function(req,res,next){
            res.end('Will send all the leaders to you!');
    })

    .post(function(req, res, next){
        res.end('Will add the leaderId ' + req.body.name + ' with details: ' + req.body.description);    
    })

    .delete(function(req, res, next){
            res.end('Deleting all leaders');
    });

    leaderRouter.route('/leaderId')
    .all(function(req,res,next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
    })

    .get(function(req,res,next){
            res.end('Will send details of the leaderId ' + req.params.leaderId +' to you!');
    })

    .put(function(req, res, next){
            res.write('Updating the leaderId ' + req.params.leaderId + '\n');
        res.end('Will update the leaderId ' + req.body.name + 
                ' with details: ' + req.body.description);
    })

    .delete(function(req, res, next){
            res.end('Deleting leaderId ' + req.params.leaderId);
    });

    
    return leaderRouter;
})();




