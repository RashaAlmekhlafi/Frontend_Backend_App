var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

// router.get('/', function (req, res, next) {
//   const actorName=req.query.actor
//   models.actor
//     .findAll({
//       // limit:5,
//       where:{
//         first_name: {
//           [Op.like]:'%'+actorName+'%'
//         }
//       },
//       attributes: ['actor_id', 'first_name', 'last_name'],
      
//       include: [{

//         model: models.film,
//         attributes: ['film_id', 'title', 'description'],

//       }],

//     })
//     .then(actorsFound => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(actorsFound));
//     });
// });


router.post('/', function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    isVerfied = authService.verifyUser(token);
    if (!token || !isVerfied) {
      res.status(401);
      res.send({
        success: false,
        message: 'You must be authonticated.'
      })
  
    }
    let response = {
      message: ' ',
      success: false,
      data: []
    }
    models.posts.findOrCreate({
      where: {
        PostTitle: req.body.postTitle,
        
      },defaults: {
        PostBody: req.body.postBody
      }
    })
      .spread(function (result, created) {
        if (created) {
          // res.redirect('/actors/' + result.actor_id);
          response.message = 'Successfully Added'
          response.success = true
          response.data = result
        } else {
          res.status(400);
          response.success = false
          // res.send('Actor already exists');
          response.message = 'Post with the same title already exists'
        }
        res.send(response)
      })
  });