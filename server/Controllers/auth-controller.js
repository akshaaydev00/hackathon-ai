import Students from "../Schema/Students.js";
import bcrypt from 'bcryptjs';
import  Jwt  from "jsonwebtoken";
import { nanoid } from "nanoid";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;


const generateUsername = async (email) => {
     let username = email.split('@')[0];
     username += '-' + nanoid(8); 
    
    return username;
}

const sendData = (user) => {
     const access_token = Jwt.sign({ id: user._id }, process.env.SECRET_KEY)
     return {
         access_token: access_token,
         name: user.personal_details.name,
         email: user.personal_details.email,
         profile_img : user.personal_details.profile_img,
         studentid: user.personal_details.studentid,
     }
 }

 
export const Signup = async (req, res) =>{
     const { name, email, password, college, grade } = req.body;
     try {
          if (!email) {
               return res.status(403).json({"error" : "Please provide an email"});
          }
          if (!password || !passwordRegex.test(password)) {
               return res.status(403).json({ "error": "Password should contain at least 1 capital letter, 1 special character, and 1 number" });
           }

           if (!college) {
            return res.status(403).json({ "error": "Please provide a college"});
           }
   

           if (!grade) {
            return res.status(403).json({ "error":"Provide the correct grade " });
           }


           if (name.length < 3) {
               return res.status(403).json({ "error": "Name should be at least 3 characters long" });
           }
   
           
           if (!emailRegex.test(email)) {
               return res.status(403).json({ "error": "Invalid email" });
           }
   
           
           const existingUser = await Students.findOne({ 'personal_details.email': email });
           if (existingUser) {
               return res.status(403).json({ "error": "Email is already in use" });
           }

        const saltRounds = 12;
        const hash = await bcrypt.hash(password, saltRounds);
        const username = await generateUsername(email);

        // Create a new user instance
        const newUser = new Students({
            personal_details: {
                name,
                email,
                studentid: username,
                password: hash
            },
            college,
            class : grade
        });

        let user = await newUser.save();
        
        return res.status(200).json({"data" : user})

     }catch (error) {
          console.log(error);
          return res.status(500).json({ "error": "An error occurred while signing up the user" });
     }
}



export const Signin = (req, res) =>{
     const { email, password } = req.body
 
         Students.findOne({ "personal_details.email": email })
             .then((user) => {
                 if (!user) {
                     return res.status(403).json({ "error": "User does not exists" })
                 }
                 else {
                     bcrypt.compare(password, user.personal_details.password, (err, result) => {
                         if (err) {
                             return res.status(403).json({ "error": "Error occured while login please try again" })
                         }
                         if (!result) {
                             return res.status(403).json({ "error": "Email and password does not match" })
                         }
                         else {
                             return res.status(200).json({"data" : sendData(user)})
                         }
                     })
                 }
 
             })
 
             .catch((error) => {
                 console.log(error);
                 res.status(500).json({ "error": error.message })
             })
 }


 export const googleAuth = async (req, res) => {
    let { access_token, fullname, email, profile_img } = req.body;
    let getUser = await Students.findOne({ "personal_info.email": email })

    if (!getUser) {
        let studentid = await generateUsername(email)
        let user = new Students({
            personal_info: { name : fullname, email, studentid, profile_img },
            google_auth: true,
        })

        user.save()
            .then((data) => {
                return res.status(200).json(sendData(data))
            })
            .catch((err) => {
                return res.status(403).json({ "error": "There is an error signing in with google! Please try again later.." })
            })
    }
    else {

        return res.status(200).json(sendData(getUser))

    }
 }