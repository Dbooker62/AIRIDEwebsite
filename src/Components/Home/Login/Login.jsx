import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { MdEmail } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../firebase";
import "./Login.scss";
import { message } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { validateAvailability } from "../validation";

const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  // Handle input change
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendPasswordReset = async () => {
    try {
      const { email } = formData;
      if (validateAvailability(email, "email")) {
        // Send password reset email
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent successfully");
        message.success("Password reset email sent successfully");
        navigate("/checkemail/" + email);
      }
    } catch (error) {
      message.error("Error sending password reset email: " + error.message);
      console.error("Error sending password reset email:", error.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password, role } = formData;
      if (!role) {
        message.error("Please Select a role first");
        return;
      }
      if (!email) {
        message.error("Please enter email first");
        return;
      }
      if (!password) {
        message.error("Please enter password first");
        return;
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loadingMessage = message.loading("Logging you in...", 0);

      if (userCredential) {
        const userRef = collection(firestore, "users");
        const businessRef = collection(firestore, "business");

        // Check if the user exists in the user table
        if (role == "user") {
          const userSnapshot = await getDocs(
            query(userRef, where("email", "==", email))
          );
          if (userSnapshot.size > 0) {
            loadingMessage();
            message.success("Login successful");
            navigate("/user");
            return;
          }
        }
        // Check if the user exists in the business table
        else if (role == "business") {
          const businessSnapshot = await getDocs(
            query(businessRef, where("email", "==", email))
          );
          console.log("i am in login");
          if (businessSnapshot.size > 0) {
            loadingMessage();
            message.success("Login successful");
            navigate("/business");
            return;
          }
        }
        loadingMessage();
        // Handle the scenario if the user is not found in any table
        message.error("User not found");
        console.error("User not found in " + role + " table");
        console.log(role);
      }
    } catch (error) {
      console.error("Failed to login:", error.message);
      message.error("Failed to login: Invalid credentials");
    }
  };
  return (
    <>
      <section>
        <div className="mainContainer">
          <div className="firstDiv flex min-h-full flex-1 flex-col justify-center px-2 py-2 lg:px-2">
            <section>
              <div className="flex ml-24 p-5 justify-center text-center font-extrabold text-6xl">
                <h2>AIRIDE</h2>
              </div>
            </section>
            <div className="bg-gray-200 rounded-xl border-r-[10%] shadow w-1/3 h-2/3 ml-[37%]">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
                  Log in
                </h2>
              </div>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg w-full">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Role
                    </label>
                    <Select
                      required
                      id="role"
                      name="role"
                      defaultValue=""
                      onChange={(value) => handleInputChange("role", value)}
                      className="w-full"
                      size="large"
                      placeholder="Select your role"
                      suffixIcon={
                        <FaUserCog style={{ color: "rgba(0,0,0,.45)" }} />
                      }
                    >
                      <Option value="user">User</Option>
                      <Option value="business">Business</Option>
                    </Select>
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg w-full">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          size="large"
                          suffix={
                            <MdEmail style={{ color: "rgba(0,0,0,.45)" }} />
                          }
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="text-sm">
                          <a
                            href="#"
                            className="font-semibold text-[#007dfe] hover:text-[#007dfe] hover:underline"
                            onClick={sendPasswordReset}
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Input.Password
                          id="password"
                          name="password"
                          type="password"
                          size="large"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
