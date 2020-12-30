const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

        username :{
               type:String 
        },
        email :{
               type:String 
        },
        password :{
               type:String 
        },
        role :{
               type:String 

            },
        contact :{
               type:String 
        },
        picture:{
            type:String
        }
});

module.exports = mongoose.model('User',UserSchema);