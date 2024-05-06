import React from "react";
import { Input } from "antd";
import "./Register.scss";
import password from "../../../assets/password.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const SetPassword = () => {
  return (
    <>
      <div className="mainContainer">
        <div className="firstDiv flex min-h-full flex-1 flex-col justify-center px-2 py-2 lg:px-2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-gray-900">
            <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight ">
              Set Password
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg w-full">
            <form className="space-y-8" action="#" method="POST">
              <div className="flex items-center justify-between gap-2 w-full"></div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <Input.Password
                    id="password"
                    name="password"
                    placeholder="Please enter your password"
                    required
                    size="large"
                    suffix={<MdEmail style={{ color: "rgba(0,0,0,.45)" }} />}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="cPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <Input.Password
                    id="cPassword"
                    name="cPassword"
                    placeholder="Please enter Confirm password"
                    required
                    size="large"
                    suffix={<MdEmail style={{ color: "rgba(0,0,0,.45)" }} />}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
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

        <div className="secondDiv">
          <img src={password} alt="login picture" />
        </div>
      </div>
    </>
  );
};

export default SetPassword;
