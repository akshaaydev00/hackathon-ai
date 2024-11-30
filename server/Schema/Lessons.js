import  mongoose , { Schema } from "mongoose";

const lessonschema = mongoose.Schema({
     lessonid : {
        type : String,
        required : true
     },

     courseid : {
        type : String,
        required : true
     },

     title : {
        type : String,
     },

     description : {
        type : []
     },

     video_link : {
        type : String,
        required : true
     }


});

export default mongoose.model('lessons', lessonschema);