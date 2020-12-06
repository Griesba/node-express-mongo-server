var express = require('express');

var bodyParser = require('body-parser');
const Leadership = require('../models/leadership');

module.exports = (function(){

    var leaderRouter = express.Router();

    leaderRouter.use(bodyParser.json());

    leaderRouter.route('/')
    .get(function(req,res,next){
        Leadership.find({}, function(err, leader){
                if(err) throw err;
                res.json(leader);
        });      
    })

    .post(function(req, res, next){
        Leadership.create(req.body, function(err, leader){
                if(err) throw err;
                console.log("Leadership created");
                var id = leader._id;
                res.writeHead(200, {
                        'Content-Type': 'text/plain'
                });
                res.end("Added Leadership whith id: " + id);
        });
    })

    .delete(function(req, res, next){
            Leadership.remove({}, function(err, resp){
                if(err) throw err;
                res.json(resp);
            });
            res.end('Deleting all Leaderships');
    });

    leaderRouter.route('/leaderId')
    .get(function(req,res,next){
            Leadership.findById(req.params.leaderId, function(err, leader){
                    if(err) throw err;
                    res.json(leader);
            });
    })

    .put(function(req, res, next){
            Leadership.create(req.body, 
                {$set: req.body}, 
                {new: true},
                function(err, leader){
                        if(err) throw err;
                        res.json(leader);
                });
    })

    .delete(function(req, res, next){
        Leadership.findByIdAndRemove(req.params.leaderId, function(err, resp) {
                if(err) throw err;
                res.json(resp);
            })
    });

    
    return leaderRouter;
})();




