import  mongoose , { Schema } from "mongoose";

let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];


const studentsschema = mongoose.Schema({
     personal_details : {
          name : {
            type : String,
            lowercase : true, 
            required : true,
          },

          email : {
            type : String,
            lowercase : true,
            required : true,
            unique : true
          },

          studentid : {
            type : String,
            required : true,
            unique : true
          },

          google_auth : {
            type : Boolean,
            default : false,
          },

          password : {
            type : String,
            required : true
          },
          profile_img: {
            type: String,
            default: () => {
                return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
            } 
        },
     },

     class : {
        type : String,
     },

     college : {
        type : String,
     },

     videos_watched : {
        type : []
     },

     topics_covered : {
        type : []
     },

     questtions_answered : {
        type : []
     }


});

export default mongoose.model('students', studentsschema);