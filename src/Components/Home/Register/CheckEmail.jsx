import React from "react";
import { Input, message } from "antd";
import "./Register.scss";
import checkEmail from "../../../assets/checkEmail.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";

const CheckEmail = () => {
  const { email } = useParams();
  const navigate=useNavigate();
  const navigateToLogin=()=>{
    navigate("/")
  }
  
  const validateEmail = (email) => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    // Test the email against the pattern
    return emailPattern.test(email);
  };
  const sendPasswordReset = async () => {
    try {
      if (email) {
        if(!validateEmail(email)){
          message.error("Please enter a valid email address");
          return;
        }
        // Send password reset email
        await sendPasswordResetEmail(auth, email);
        
        console.log("Password reset email sent successfully");
        message.success("Password reset email sent successfully");
        navigate("/checkemail/" + email);
      } else {
        message.error("Please enter your email address First");
      }
    } catch (error) {
      message.error("Error sending password reset email: " + error.message);
      console.error("Error sending password reset email:", error.message);
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="firstDiv flex min-h-full flex-1 flex-col justify-center px-2 py-2 lg:px-2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-gray-900">
            <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight ">
              Check your email
            </h2>
            <div className="mt-10 flex items-center justify-center">
              <div>
                <p>Please enter the verification code we sent to:</p>
                <div className="text-[#007dfe] text-[1.2rem] hover:underline hover:text-[#007dfe]">
                  {email}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2  sm:mx-auto sm:w-full sm:max-w-lg w-full">
            <form className="space-y-8" action="#" method="POST">
              <div className="flex items-center justify-between gap-2 w-full"></div>
              <div>
                <button
                  onClick={navigateToLogin}
                  type="submit"
                  className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Wrong Email
                  <IoIosArrowForward className="flex justify-center items-center ml-1" />
                </button>
              </div>
              <div>
                <button
                onClick={navigateToLogin}
                  type="submit"
                  className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login With New Password 
                  <IoIosArrowForward className="flex justify-center items-center ml-1" />
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-base text-gray-500">
              Didn't get the email?<span> </span>
              <a
              onClick={sendPasswordReset}
                href="#"
                className="font-semibold leading-6 text-[#007dfe] hover:text-[#007dfe] hover:underline"
              >
                Resend 
              </a>
            </p>
          </div>
        </div>

        <div className="secondDiv">
          <img src={checkEmail} alt="login picture" />
        </div>
      </div>
    </>
  );
};

export default CheckEmail;
