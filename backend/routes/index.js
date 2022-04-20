var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//show POsts
router.get('/posts', function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1]
  Verfied = authService.verifyUser(token);
  const userId=Verfied.UserId
  if (!token || !Verfied.isVerfied) {
    res.status(401);
    res.send({
      success: false,
      message: 'You must be authonticated.'
    })

  }
  models.posts
    .findAll({
      // limit:5,
      where:{
        UserId: userId
      },
      attributes: ['PostId', 'PostTitle', 'PostBody', 'UserId','createdAt'],
      
      

    })
    .then(actorsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(actorsFound));
    });
});


//Post Create
// router.post('/', function (req, res, next) {
//   models.actor.create(req.body)
//     .then(newActor => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(newActor));
//     })
//     .catch(err => {
//       res.status(400);
//       res.send(err.message);
//     });
// });
//add post
router.post('/posts', function (req, res, next) {
  const userId=req.query.userId
  const token = req.headers.authorization.split(' ')[1]
  isVerfied = authService.verifyUser(token);
  if (!token || !isVerfied) {
    res.status(401);
    res.send({
      success: false,
      message: 'You must be authonticated.'
    })

  }

  models.posts.create({
 
      PostTitle: req.body.PostTitle,
      PostBody: req.body.PostBody,
      UserId:userId,
      
    
  }).then(newpost => {
          res.setHeader('Content-Type', 'application/json');
          // res.send(JSON.stringify(newpost));
          res.send({
            message:'Successfully Added',
            success: true,
            data: JSON.stringify(newpost)

          })
         
        })
        .catch(err => {
          res.status(400);
         
            res.send({message: err.message})
        });
      
  
});

//get By postId
router.get('/posts/:id', function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1]
  isVerfied = authService.verifyUser(token);
  if (!token || !isVerfied) {
    res.status(401);
    res.send({
      success: false,
      message: 'You must be authonticated.'
    })

  }
  models.posts
    .findByPk(parseInt(req.params.id), {
      attributes: ['postTitle','postBody','createdAt','updatedAt','UserId'],
      
    })
    .then(postFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(postFound));
    });
});


//delete post
router.delete("/posts/:id", function (req, res, next) {
  let response = {
    message: ' ',
    success: false,
    data: []
  }
  let postId = parseInt(req.params.id);
  const token = req.headers.authorization.split(' ')[1]
  isVerfied = authService.verifyUser(token);
  if (!token || !isVerfied) {
    res.status(401);
    res.send({
      success: false,
      message: 'You must be authonticated.'
    })

  }
  models.posts
    .destroy({
      where: { PostId: postId }
    })
    .then(result => {
      if (result == 0) {
        response.message = 'there was nothing to be deleted.'
        response.success = false
        // res.send('there was nothing to be deleted.')
      } else {
        response.message = `successfully deleted ${result} row.`
        response.success = true
        // res.send(`successfully deleted ${result} row`)
      }
      res.send(response)
    })
    .catch(err => {
      res.status(400);
      response.message = "There was a problem deleting the actor. Please make sure you are specifying the correct id."
      res.send(response)
      // res.send("There was a problem deleting the actor. Please make sure you are specifying the correct id."); 
    });

});

//update post
router.put("/posts/:id", function (req, res, next) {
  let response = {
    message: ' ',
    success: false,
    data: []
  }
  let postId = parseInt(req.params.id);
  const token = req.headers.authorization.split(' ')[1]
  isVerfied = authService.verifyUser(token);
  if (!token || !isVerfied) {
    res.status(401);
    res.send({
      success: false,
      message: 'You must be authonticated.'
    })

  }
  models.posts
    .update(req.body, { where: { PostId: postId } })
    .then(result => {
      response.message = 'Successfully Updated'
      response.success = true
      response.data = result
      res.send(response)
    })
    .catch(err => {
      res.status(400);
      response.message = 'There was a problem updating the post. '
      response.success = false
      res.send(response)
      // res.send("There was a problem updating the actor.  Please check the actor information.");
    });
});

module.exports = router;
