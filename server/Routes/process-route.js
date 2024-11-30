import express, { Router } from "express";
import { createAssignment, createCourse, createLesson } from "../Controllers/process-controller.js";


export const processRoute = express.Router()

processRoute.route("/create-course").post(createCourse);
processRoute.route("/create-lesson").post(createLesson);
processRoute.route("/create-assesment").post(createAssignment);