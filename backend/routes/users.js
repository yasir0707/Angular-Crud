var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/MERN',{useNewUrlParser:true , 
 useFindAndModify: false, useUnifiedTopology: true},(err)=>{
  if(err){console.log(`Connection error`)}
  else{console.log(`connection Success`) }
});
var User = require('../model/user');
/* GET users listing. */
router.get('/',async function(req, res, next) {
    var task =await  User.find({});
    if(task){
      res.json(task);
    }
    else{
      res.json({msg:'not get'})
    }
});
router.post('/add',function(req,res){
      const task = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
        contact:req.body.contact,
        picture:req.body.picture
      })
      if(task.save()){
            res.json({msg:task});
            console.log('task add');
      }
      else{
        
        res.json({msg:'task not add'});
        console.log('task not add');
      }
});
// Delete
router.delete('/delete/:id',(req,res)=>{
  var id = req.params.id;
  var task = User.findByIdAndDelete(id);
  task.exec((err,data)=>{
    if(!err){
      console.log('delete')
    }else{
      console.log('not delete')
    }
  })
  
})
// Update
router.post('/update/:id',(req,res)=>{
    var id = req.params.id;
      var update = User.findByIdAndUpdate(id,{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
        contact:req.body.contact,
        picture:req.body.picture
        
      })
      update.exec((err,data)=>{
        if(err) throw err;
        else{
          console.log('failed')
        }
      })
  })
module.exports = router;
