import React, { useState, useEffect } from "react";
import NavBar from "../../utility/NavBar/NavBar";
import DisplayOffers from "../DisplayOffer/DisplayOffers";
import { Button } from "reactstrap";
// import airide from "../../assets/airide.png";
import OfferItems from "../DisplayOffer/OfferItem";
import AddOfferModal from "../../utility/modal/AddOfferModal";
import axios from "axios";
import { Padding } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { USER_TYPE } from "../../constant";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
const BusinessDashboard = () => {
  const [isvalid, setIsValid] = useState(false);
  const [isvalidUser, setIsValidUser] = useState(false);
  const [open, setOpen] = useState(true);
  // const [accordions, setAccordions] = useState([]);
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  // Fetch offers from JSON server
  const fetchOffers = async () => {
    try {
      const offersCollection = collection(firestore, "offers");
    const offersSnapshot = await getDocs(offersCollection);
    const offersData = offersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
      // console.log(offersData);
    setOffers(offersData);
    return offersData;
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };
  useEffect(() => {
    fetchOffers();
  }, []);

  const handleNextUser = () => {
    navigate("/user");
  };
  return (
    <div>
      <main>
        <NavBar
          isvalid={isvalid}
          setIsValid={setIsValid}
          isvalidUser={isvalidUser}
          setIsValidUser={setIsValidUser}
        />
      </main>
      <section>
        <div className="mt-10 ml-10 flex justify-between">
          <h1 className="text-2xl font-bold">Welcome, Business Owner</h1>
          <AddOfferModal fetchOffers={fetchOffers} />
        </div>
      </section>

      <section className="container w-3/4  mt-10">
        <DisplayOffers
          offers={offers}
          setOffers={setOffers}
          userType={USER_TYPE.business}
        />
      </section>
      <div className="flex justify-end mr-10">
        <Button
          variant="contained"
          sx={{ marginTop: "5px" }}
          onClick={handleNextUser}
          color={"primary"}
          style={{color:"black"}}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BusinessDashboard;
