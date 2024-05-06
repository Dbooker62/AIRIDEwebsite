import React from "react";
import { Input, Select } from "antd";
import "./Register.scss";
import role from "../../../assets/role.jpg";
import { FaUserCog } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const Role = () => {
  return (
    <>
      <div className="mainContainer">
        <div className="firstDiv flex min-h-full flex-1 flex-col justify-center px-2 py-2 lg:px-2">
          <div className="bg-gray-200  border rounded-xl shadow  w-1/3 h-2/3 ml-[30%]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
                What is your role?
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg w-full">
              <form className="space-y-8" action="#" method="POST">
                <div className="flex items-center justify-between gap-2 w-full"></div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Role
                  </label>
                  <div className="mt-2">
                    <Select
                      id="role"
                      placeholder="Your Role"
                      size="large"
                      className="w-full"
                      suffixIcon={
                        <FaUserCog
                          style={{ color: "rgba(0,0,0,.45)" }}
                          size="large"
                        />
                      }
                    >
                      <Option value="male">User</Option>
                      <Option value="female">Business</Option>
                    </Select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gender
                  </label>
                  <div className="mt-2">
                    <Select
                      id="gender"
                      placeholder="Your Gender"
                      size="large"
                      className="w-full"
                      suffixIcon={
                        <BiMaleFemale
                          style={{ color: "rgba(0,0,0,.45)" }}
                          size="large"
                        />
                      }
                    >
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Next{" "}
                    <IoIosArrowForward className="flex justify-center items-center ml-1" />
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-base text-gray-500">
                Already have an account?<span> </span>
                <a
                  href="#"
                  className="font-semibold leading-6 text-[#007dfe] hover:text-[#007dfe] hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="secondDiv">
          <img src={role} alt="login picture" />
        </div> */}
      </div>
    </>
  );
};

export default Role;
