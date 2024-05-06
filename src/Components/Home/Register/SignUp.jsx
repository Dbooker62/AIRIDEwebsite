import React, { useState } from "react";
import "./Register.scss";
import { Select } from "antd";
import { FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserRegistration from "../UserRegistration/UserRegistration";
import BusinessRegistration from "../BusinessRegistration/BusinessRegistration";

const { Option } = Select; // Make sure to destructure Option from Select

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // Default to "user" for initial state

  const handleRoleChange = value => {
    setRole(value); // Update role based on Select change
  };


  return (
    <>
      <section>
        <div className="flex p-5 -ml-10 justify-center text-center font-extrabold text-6xl">
          <h2>AIRIDE</h2>
        </div>
      </section>
      <section
        className={`shadow w-3/5 ${
          role === "user" ? "w-3/5 " : "w-4/6 -mt-14 "
        } h-[185vh] ml-72`}
      >
        <div className={`mt-10 p-10`}>
          <p className="text-center text-4xl font-xl leading-9 tracking-tight text-gray-900">
            {role === "user"
              ? "User Registration Form"
              : "Business Registration Form"}
          </p>
        </div>
        <div className="mainContainer ml-10 mt-60">
          <div className="firstDiv flex container min-h-full flex-1 flex-col justify-center px-2 py-2 lg:px-2">
            <div
              className={`border-b ${
                role === "user" ? " " : " "
              } border-gray-900/10 pb-12`}
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <section>
              <div>
                <label
                  htmlFor="role"
                  className="block mt-5 text-sm font-medium leading-6 text-gray-900"
                >
                  Role
                </label>
                <div className="mt-2">
                  <Select
                    id="role"
                    placeholder="Your Role"
                    value={role}
                    size="large"
                    className="w-1/2"
                    onChange={handleRoleChange}
                    suffixIcon={
                      <FaUserCog
                        style={{ color: "rgba(0,0,0,.45)" }}
                        size="large"
                      />
                    }
                  >
                    <Option value="user">User</Option>
                    <Option value="business">Business</Option>
                  </Select>
                </div>
              </div>
              {role === "user" ? (
                <UserRegistration  role={role}/>
              ) : (
                <BusinessRegistration role={role}/>
              )}
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
