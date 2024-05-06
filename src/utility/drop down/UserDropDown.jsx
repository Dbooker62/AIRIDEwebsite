import React from "react";
import { Card, CardBody, Container, Col, Row } from "reactstrap";
// import virtual from "../../assets/virtual.png";
import airide from "../../assets/airide.png";

const UserDropDown = ({ isvalidUser, setIsValidUser }) => {
  return (
    <div>
      <div className={` z-10   absolute ${!isvalidUser ? "hidden" : "show  "}`}>
        <Container className={`w-72 -ml-[13rem] mt-0`}>
          <Row>
            <Col>
              <Card className="border rounded-lg  shadow ">
                <CardBody className=" text-center bg-[#f8961e] ">
                  <img
                    className="w-34 h-20 ml-14 rounded-circle "
                    src={airide}
                    alt=""
                  />
                  <h1 className="p-3 fs-4 text-white">Nazar Ali</h1>
                  <p className="fs-4 text-white">03-134221-033</p>
                </CardBody>
                <hr></hr>
                <div className="font-bold text-white bg-[#616161]  p-4 ">
                  <h1>Profile</h1>
                  <p className="mt-2 hover:bg-">Change Password</p>
                  <p className="mt-2">Sign Out</p>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UserDropDown;
