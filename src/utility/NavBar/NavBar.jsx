import React, { useState } from "react";
// import { Card, CardBody, Container, Col, Row } from "reactstrap";
import UserDropDown from "../../utility/drop down/UserDropDown";
import airide from "../../assets/airide.png";

// import UserPopUp from "../businessDashbord/UserPopUp";
const NavBar = ({ isvalid, setIsValid, isvalidUser, setIsValidUser }) => {
  return (
    <nav
      className="navbar shadow w-[100%] col-12 col-sm-12 col-md-12  col-lg-12    navbar-light "
      style={{ backgroundColor: "#f8961e", height: "72px" }}
    >
      <div>
        <button className={`navbar-brand w-96 -mt-8 d-flex `}>
          <img
            src={airide}
            className="w-20 mt-3 ml-2 h-18 border rounded-circle"
            alt=""
          />
          <h3 className="ms-3 text-white  text-[45px] mt-6 font-bold fs-md-1 fs-lg-2">
            AIRIDE
          </h3>
        </button>
      </div>
      <div>
        <ul
          className="nav navbar-nav nabar-right  p-3 pt-1 "
          style={{ width: "100%" }}
        >
          <li className="dropdown ">
            <a className={`d-flex   ${!isvalid ? "ml-10 " : ""}nav-link px-0`}>
              <i
                onClick={() => setIsValidUser(!isvalidUser)}
                className="fa fa-user text-3xl "
              ></i>
              {/* <span className="text-white mt-1 mr-0 fs-4 text-align-center">
                03-14221-033
              </span> */}
            </a>
          </li>

          <UserDropDown
            isvalidUser={isvalidUser}
            setIsValidUser={setIsValidUser}
          />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
