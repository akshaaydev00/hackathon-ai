import  mongoose , { Schema } from "mongoose";

const questionschema = mongoose.Schema({
     questionid : {
        type : String,
        required : true
     },

     assementid : {
        type : String,
        required : true
     },

     text : {
        type : String,
        required : true
     },

     options : {
        type : []
     },

     type : {
        type : String,
     },

     correct_answer : {
        type : String,
        required : true
     }


});

export default mongoose.model('questions', questionschema);