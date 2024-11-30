import  mongoose , { Schema } from "mongoose";

const assesmentschema = mongoose.Schema({
     assesntid : {
        type : String,
        required : true
     },

     lessonid : {
        type : String,
        required : true
     },

     title : {
        type : String,
     },

     type : {
        type : String,
     },

     questionid : {
        type : [],
     }


});

export default mongoose.model('assements', assesmentschema);