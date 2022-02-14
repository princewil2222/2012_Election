const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

const Vote = require('../models/vote2');

const Pusher = require("pusher");


const pusher = new Pusher({
  appId: "1345817",
  key: "5a354b4c538d4081acd9",
  secret: "e30274fd4ec840c0738b",
  cluster: "eu",
  useTLS: true
});


router.get('/', (req, res) =>{
    Vote.find().then(votes =>
        res.json({success: true,
        votes: votes})
    );
});


router.post('/', (req, res)  =>{
    const newVote = {
        sec: req.body.sec,
        points: 1
    
    }
 new Vote(newVote).save().then(vote => {
        pusher.trigger("2012-set-poll2", "2012-set-vote2", {
            points: parseInt( vote.points),
            sec: vote.sec
          });
    
          return res.json({success: true, message: "Thank you for voting"});
  });
});
    
 

module.exports = router;