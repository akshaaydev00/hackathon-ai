import { nanoid } from "nanoid";
import Courses from "../Schema/Courses.js";
import Lessons from "../Schema/Lessons.js";
import Questions from "../Schema/Questions.js";
import Assesments from "../Schema/Assesments.js";



const createUsername = async (name) => {
    const randomString = nanoid(15);
    const courseId = name.toLowerCase().replace(/\s+/g, '') + randomString; 
    return courseId;
}


export const createCourse = async ( req, res ) => {
    let { name, description, category } = req.body;
    
    try{
    if(!name || name.length < 4){
        return res.status(403).json({"error" : "Please enter a valid course name."});
    }
    if(!description){
        return res.status(403).json({"error" : "Please enter a valid description for the course."});
    }
    if(!category || category.length === 0){
        return res.status(403).json({"error" : "Please enter a valid course category"});
    }

    const courseid = await createUsername(name);
    const newCourse = new Courses({
        courseid,
        coursename : name.toLowerCase(),
        description,
        category
    })

    let course = await newCourse.save();
    return res.status(200).json({"data" : course})
   }catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "An error occurred while creating a course" });
}
}


export const createLesson = async (req, res) =>{
    let { title, description, courseid, video_link } = req.body;
    
    try{
    if(!title || title.length < 4){
        return res.status(403).json({"error" : "Please enter a valid course title."});
    }
    if(!description){
        return res.status(403).json({"error" : "Please enter a valid description for the course."});
    }
    if(!video_link){
        return res.status(403).json({"error" : "Please enter a valid video link"});
    }

    let isCourseid = await Courses.findOne({"courseid" : courseid})
    
    const lessonid = await createUsername(title);

  
    if (!isCourseid) {
        return res.status(403).json({"error" : "This is not a valid course"});
    }


    isCourseid.lessons.push(lessonid);
    isCourseid.save();

        const newLesson = new Lessons({
            lessonid,
            courseid,
            title : title.toLowerCase(),
            description,
            video_link
        });

        let lesson = await newLesson.save();
        return res.status(200).json({"data" : lesson})
   


    
   }catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "An error occurred while creating a course" });
}
}


export const createAssignment = async (req, res) =>{
     let { lessonid, title, type, questionid } =req.body;

     try{
     const isLesson = await Lessons.findOne({lessonid});
     if (!isLesson) {
        return res.status(403).json({"error" : "Invalid lesson id"});
     }

     if(!title || title.length < 4){
        return res.status(403).json({"error" : "Please enter a valid assesment title."});
    }
    if(!type){
        return res.status(403).json({"error" : "Please enter a valid type."});
    }
    if(!questionid){
        return res.status(403).json({"error" : "Question id cannot be empty"});
    }

    let isQuestion = await Questions.findOne({ questionid });
    if (!isQuestion) {
        return res.status(403).json({"error" : "Please enter a valid question id"})
    }

    

    const assesntid = await createUsername(title);
    const newassesment = new Assesments({
        assesntid,
        lessonid,
        title : title.toLowerCase(),
        type,
    });

    newassesment.questionid.push(questionid);
    
    let assignment = newassesment.save();
    return res.status(200).json({"data" : assignment});   


}catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "An error occurred while creating an assesment" });
}
}




export const createQuestions = async (req, res) =>{
    let { assementid, type, text, options, correct_answer } =req.body;

    try{
    const isAssesment = await Lessons.findOne({assementid});
    if (!isAssesment) {
       return res.status(403).json({"error" : "Invalid assesment"});
    }

    if(!text || text.length < 4){
       return res.status(403).json({"error" : "Please enter a valid assesment title."});
   }
   if(!type){
       return res.status(403).json({"error" : "Please enter a valid type."});
   }
   if(type == 'mcq' && options.length < 4){
       return res.status(403).json({"error" : "You should provide atleat 4 options"});
   }

   if (!correct_answer) {
    return res.status(403).json({"error" : "Please provide the correct answer"});
   }

   

   let isQuestion = await Questions.findOne({ questionid });
   if (!isQuestion) {
       return res.status(403).json({"error" : "Please enter a valid question id"})
   }

   

   const assesntid = await createUsername(title);
   const newassesment = new Assesments({
       assesntid,
       lessonid,
       title : title.toLowerCase(),
       type,
   });

   newassesment.questionid.push(questionid);
   
   let assignment = newassesment.save();
   return res.status(200).json({"data" : assignment});   


}catch (error) {
   console.log(error);
   return res.status(500).json({ "error": "An error occurred while creating an assesment" });
}
}