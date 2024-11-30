import { Link, Navigate } from "react-router-dom"
import InputBox from "../components/input.component"
import google_icon from "../imgs/google.png"
import AnimatioWrapper from "../common/page-animation"
import { useContext, useRef } from "react"
import {toast, Toaster} from "react-hot-toast"
import axios from 'axios';
import { storeInSession } from "../common/session"
import { UserContext } from "../App"
import { authWithGoogle } from "../common/firebase"

const UserAuthForm = ({ type }) => {

const authForm = useRef();   

let {  userAuth , setUserAuth } = useContext(UserContext)

const handleGoogleAuth = async (e) =>{

    e.preventDefault();
    let user = await authWithGoogle()
    // console.log(user);

    let serverRoute = "/google-auth";
    let formData = {
        access_token : user.accessToken,
        fullname : user.displayName,
        email : user.email,
        profile_img : user.photoURL
    }
}

const userAuthThroughServer = (serverRoute, formData) =>{

    console.log(import.meta.env.VITE_SERVER + serverRoute);
    axios.post(import.meta.env.VITE_SERVER + serverRoute, formData)
    .then(( {data} ) =>{
        console.log(data.data);
        storeInSession("user", JSON.stringify(data.data))
        setUserAuth(data.data)

    })
    .catch(( {response }) =>{
        // console.log(response.data.error);
        toast.error(response.data.error)
    })
}


    const handleSubmit = (e) =>{
        
        e.preventDefault();
        let serverRoute = type == "sign-in" ? "/signin" : "/signup"
         
        //formData
        let form = new FormData(authForm.current);
        let formData = {};
        for (let [key,value] of form.entries()) {
            formData[key] = value
         }
         const { fullname, email, password } = formData
         //validating data
         let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
         let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
         if (fullname) {
            if (fullname.length < 3) {
                return toast.error( "Fullname must be atleast 3 letters long");
            }
         }
         if (!email.length) {
             return toast.error("Enter the email");
         }
         if (!emailRegex.test(email)) {
             return toast.error( "Invalid email");
         }
         if (!passwordRegex.test(password)) {
             return toast.error( "Password should atleast be 6-12 characters long and should contain atleast 1 capital letter");
         }

         userAuthThroughServer(serverRoute, formData)
        
    }
    const acc_token = userAuth.access_token
    return (
         
             acc_token ? <Navigate to="/" /> 
             :
             <AnimatioWrapper keyValue={type}>
             <section className="h-cover flex items-center justif-center">
                <Toaster />
                <form ref={authForm}  className="w-[80%] max-w-[400px]">
                    <h1 className="text-4xl font-gelasio capitalize text-center mb-24 ">
                        {type == "sign-in" ? "Welcome back" : "Join us today"}
                    </h1>

                    {
                        type != "sign-in" ? <InputBox 
                              name="fullname"
                              type="text"
                              placeholder="Full Name"
                              icon="fi-rr-user"
                        /> 
                        : ""
                    }
                     <InputBox 
                              name="email"
                              type="email"
                              placeholder="Email"
                              icon="fi-rr-envelope"
                        /> 
                     <InputBox 
                              name="password"
                              type="password"
                              placeholder="Password"
                              icon="fi-rr-key"
                        /> 
                    
                    <button 
                        className="btn-dark center mt-14"
                        type="submit"
                        onClick={handleSubmit}
                    >

                    { type.replace("-", " ") }
                    </button>
                    <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                        <hr className="w-1/2 border-black" />
                        <p>or</p>
                        <hr className="w-1/2 border-black" />
                        </div>
                        <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center" onClick={handleGoogleAuth}>
                            <img src={google_icon} className="w-5" alt="" />
                            continue with google
                        </button>

                        {

                            type == "sign-in" ? <p className="mt-6 text-dark-grey text-xl text-center">
                                Don't have an account?
                                <Link to="/signup" className="underline text-black text-xl ml-1">Join us today</Link>
                            </p>
                            : <p className="mt-6 text-dark-grey text-xl text-center">
                            Already a member?
                            <Link to="/signin" className="underline text-black text-xl ml-1">Sign in here</Link>
                        </p>
                        }

                </form>
             </section>
             </AnimatioWrapper>
         
      )
}

export default UserAuthForm