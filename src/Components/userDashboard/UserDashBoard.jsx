import React, { useState, useEffect, useContext } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { message } from "antd";
import NavBar from "../../utility/NavBar/NavBar";
import DisplayOffers from "../DisplayOffer/DisplayOffers";
import { USER_TYPE } from "../../constant";
import { collection, getDocs } from "firebase/firestore";
import { firestore, generateToken, messaging } from "../../firebase";
import { AuthContext } from "../Home/AuthContext";
import { onMessage } from "firebase/messaging";

const UserDashboard = () => {
  useEffect(()=>{
    generateToken();
    onMessage(messaging,(payload)=>{
    console.log(payload);
    message.info(payload.notification.body)
    })
    },[]);

  const [offers, setOffers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const {currentUser}=useContext(AuthContext);
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(firestore, "categories-list");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesData = categoriesSnapshot.docs.map(
          (doc) => doc.data().category
        );
        setCategories(categoriesData[0]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const fetchOffers = async () => {
    try {
      // Fetch offers from Firestore
      // You need to adjust this to match your Firestore structure
      // This assumes each offer document has a field named 'category'
      const offersCollection = collection(firestore, "offers");
      const offersSnapshot = await getDocs(offersCollection);
      const offersData = offersSnapshot.docs.map((doc) => doc.data());
      setOffers(offersData);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Filter offers based on selected categories
  const filteredOffers = offers.filter((offer) =>
    selectedCategories.includes(offer.category)
  );

  return (
    <>
      <NavBar />
      <section className="my-10 ml-10 flex justify-between">
        <h1 className="text-2xl font-bold">Welcome, user</h1>
        <FormControl fullWidth className="max-w-[250px]">
          <InputLabel id="category-label">Select Categories</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="Select Categories"
              />
            }
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ margin: 2 }} />
                ))}
              </div>
            )}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>
      <section>
        <DisplayOffers offers={filteredOffers} userType={USER_TYPE.user} />
      </section>
    </>
  );
};

export default UserDashboard;
