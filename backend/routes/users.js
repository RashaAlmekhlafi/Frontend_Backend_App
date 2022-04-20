var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
/* GET filtered users listing. */
router.get('/', function(req, res, next) {
  
 var wher={}
  if (req.query.IsDeleted==="true"){
     wher={
      Deleted:true,
    }
  }else if(req.query.IsDeleted==="false"){
     wher={
      Deleted:false,
    }
  }else{
    wher={
      UserId:{
      [Op.gte]: 1 
      }
     
    }
  }
   
  models.users
    .findAll({
      where:wher,
      
      attributes: ['FirstName', 'LastName', 'UserId','Username',"Deleted"],
     
    })
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    });
});



//get all users
// router.get('/', function(req, res, next) {
//   models.users
//     .findAll({
//       attributes: ['FirstName', 'LastName', 'UserId','Username',"Deleted"],
//     })
//     .then(usersFound => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(usersFound));
//     });
// });

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Email: req.body.email
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Password: authService.hashPassword(req.body.password) 
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send({
          message:'User successfully created',
          success:true
        });
      } else {
        res.send({
          message:'This user already exists',
          success:false
        });
      }
    });
});

// Login user and return JWT as cookie
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Email: req.body.email
    }
  }).then(user => {
    if (!user) {
      res.send({
        success:false,
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        
        res.send({
          message:'Login successful',
          success:true,
          token:token,
          UserName:user.dataValues.FirstName+' '+user.dataValues.LastName,
          UserId:user.dataValues.UserId,
          Admin:user.dataValues.Admin
        });
      } else {
        res.send({
          message:'Wrong password',
        success:false});
      }
    }
  })
  .catch(err => {
    res.status(400);
    res.send({
      message:'There was a problem in logging in. Make sure of the information you entered',
      success:false
    })
    
  });
});


//get By USerId
router.get('/:id', function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1]
  isVerfied = authService.verifyUser(token);
  if (!token || !isVerfied) {
    res.status(401);
    res.send({
      success: false,
      message: 'You must be authonticated.'
    })

  }
  models.users
    .findByPk(parseInt(req.params.id), {
      attributes: ['FirstName', 'LastName','Username','Email','createdAt','updatedAt','UserId'],
      
    })
    .then(userFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(userFound));
    });
});


//update User
router.put("/:id", function (req, res, next) {
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
  let UserId = parseInt(req.params.id);
  models.users
    .update(req.body, { where: { UserId: UserId } })
    .then(result => {
      response.message = 'Successfully Updated'
      response.success = true
      response.data = result
      res.send(response)
    })
    .catch(err => {
      res.status(400);
      response.message = 'There was a problem updating the user.  Please check the user information.'
      response.success = false
      res.send(response)
      // res.send("There was a problem updating the actor.  Please check the actor information.");
    });
});


//delete user
router.put("/admin/:id", function (req, res, next) {
  let response = {
    message: ' ',
    success: false,
    data: []
  }
  let UserId = parseInt(req.params.id);
  models.users
    .update({
      Deleted:req.body.deleted}, { where: { UserId: UserId } })
    .then(result => {
      response.message = 'Successfully Done'
      response.success = true
      response.data = result
      res.send(response)
    })
    .catch(err => {
      res.status(400);
      response.message = 'There was a problem deleting the user.'
      response.success = false
      res.send(response)
      // res.send("There was a problem updating the actor.  Please check the actor information.");
    });
});

// router.delete("/:id", function (req, res, next) {
//   let response = {
//     message: ' ',
//     success: false,
//     data: []
//   }
//   let UserId = parseInt(req.params.id);
//   models.users
//     .destroy({
//       where: { UserId: UserId }
//     })
//     .then(result => {
//       if (result == 0) {
//         response.message = 'there was nothing to be deleted.'
//         response.success = false
//         // res.send('there was nothing to be deleted.')
//       } else {
//         response.message = `successfully deleted ${result} row.`
//         response.success = true
//         // res.send(`successfully deleted ${result} row`)
//       }
//       res.send(response)
//     })
//     .catch(err => {
//       res.status(400);
//       response.message = "There was a problem deleting the actor. Please make sure you are specifying the correct id."
//       res.send(response)
//       // res.send("There was a problem deleting the actor. Please make sure you are specifying the correct id."); 
//     });

// });
module.exports = router;
