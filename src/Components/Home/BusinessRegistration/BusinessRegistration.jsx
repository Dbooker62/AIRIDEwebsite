import React, { useState } from "react";
import { Select } from "antd";
import { FaEye } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { IconButton, TextField } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { message } from "antd";
const { Option } = Select;
import { validateEmail } from "../validation";

const BusinessRegistration = () => {
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessRole, setBusinessRole] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState({
    lat: -34.397,
    lng: 150.644,
  });
  const [searchBox, setSearchBox] = useState(null);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const onPlacesLoaded = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    const loc = places[0].geometry.location;
    setLocation({ lat: loc.lat(), lng: loc.lng() });
  };

  const handleGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        setLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      });
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    // Create user account

    if (!ownerName) {
      message.error("Please enter a valid name");
      return;
    }
    if (!ownerEmail) {
      message.error("Please enter email first");
      return;
    }
    if (!password) {
      message.error("Please enter password first");
      return;
    }
    if (!ownerPhoneNumber && ownerPhoneNumber.length < 11) {
      message.error("Please enter a valid phone number");
      return;
    }
    if (!postalCode && postalCode.length < 3) {
      message.error("Please enter a valid postal code");
      return;
    }
    if (!businessName) {
      message.error("Please enter a valid business name");
      return;
    }
    if (!businessAddress) {
      message.error("Please enter a valid business address");
      return;
    }
    console.log(ownerEmail);
    if (!validateEmail(ownerEmail)) {
      message.error("Please enter a valid email");
      return;
    }
   
    if (password.length < 8) {
      message.error("Password must be at least 8 characters");
      return;
    }
    try {
      message.loading("Registering");
            const userCredential = await createUserWithEmailAndPassword(
        auth,
        ownerEmail,
        password
      );
      // Add business registration data to Firestore collection
      await addDoc(collection(firestore, "business"), {
        uid: userCredential.user.uid,
        firstName: ownerName,
        email: ownerEmail,
        role: "business",
        phoneNumber: ownerPhoneNumber,
        postalCode,
        businessName,
        businessAddress,
        location,
      });
      message.success("Business registered successfully:");
      console.log("Business registered successfully:");
    } catch (error) {

      console.error("Failed to register business:", error.message);
      message.error("Error Loging in :" + error.message);
    }
  };

  return (
    <>
      <form className="flex-column" onSubmit={handleRegister}>
        <div className="flex">
          <section className="col-6">
            <div className="mt-5">
              <h1 className="font-bold text-2xl">STEP 1</h1>
            </div>
            <div className="mt-10  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  for="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900 "
                >
                  Owner Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setOwnerName(e.target.value)}
                    value={ownerName}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <br></br>

              <div className="sm:col-span-4">
                <label
                  for="email"
                  className="block  text-sm font-medium leading-6 text-gray-900"
                >
                  Owner Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    value={ownerEmail}
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    className=" w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  for="Phone Number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Owner Phone Number
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setOwnerPhoneNumber(e.target.value)}
                    value={ownerPhoneNumber}
                    type="number"
                    name="Phone Number"
                    id="city"
                    autocomplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                    type="number"
                    name="postal-code"
                    id="postal-code"
                    autocomplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <br></br>
              <div className="sm:col-span-4">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    icon={<FaEye />}
                  />
                </div>
              </div>
              <br></br>
              <div className="sm:col-span-4">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Re-Enter Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="col-6 ml-24">
            <div className="mt-20">
              <h1 className="font-bold text-2xl">STEP 2</h1>
            </div>
            <div className="mt-10  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  for="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900 "
                >
                  Business Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setBusinessName(e.target.value)}
                    value={businessName}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <br></br>
              <br></br>
              <div className="sm:col-span-3">
                <label
                  for="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900 "
                >
                  Business Address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    value={businessAddress}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <br></br>
              <div className="sm:col-span-3">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select Location
                </label>
                <div className="mt-2">
                  <Select
                    onChange={(value) => setLocation(value)}
                    value={location}
                    //   disabled={true}
                    placeholder="Your Role"
                    size="large"
                    className="w-1/2"
                  >
                    <Option value="Pakistan">Pakistan</Option>
                    <Option value="USA">USA</Option>
                    <Option value="Canada">Canada</Option>
                    <Option value="United Arab Amarat">
                      United Arab Amarat
                    </Option>
                  </Select>
                </div>
              </div>
            </div>
          </section>
        </div>
        <br></br>
        <LoadScript
          googleMapsApiKey="AIzaSyBWVWXEFmeiVZhzpgzoqiy4tcyGvMB6g14" // Replace with your actual API key.
          libraries={["places"]}
        >
          <GoogleMap mapContainerStyle={mapStyles} center={location} zoom={15}>
            <Marker position={location} />
            <StandaloneSearchBox
              onLoad={onPlacesLoaded}
              onPlacesChanged={onPlacesChanged}
            >
              <TextField
                fullWidth
                placeholder="Search location"
                variant="outlined"
                sx={{
                  marginTop: "10px",
                  boxShadow: "10px",
                }}
              />
            </StandaloneSearchBox>
            <IconButton
              onClick={handleGPSLocation}
              style={{ position: "absolute", top: 10, right: 10 }}
            >
              <MyLocationIcon />
            </IconButton>
          </GoogleMap>
        </LoadScript>
        {/* <iframe
          className="mt-10"
          id="inlineFrameExample"
          title="Inline Frame Example"
          width="100%"
          height="300"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
        ></iframe> */}
        <div className="flex justify-end">
          <p className="mt-10 text-center text-base text-gray-500">
            Are you sure?{" "}
            <button
              type="submit"
              className="font-semibold leading-6 w-40 rounded-xl text-[#007dfe] hover:text-[#007dfe] hover:underline"
            >
              Submit
            </button>
          </p>
        </div>
      </form>
    </>
  );
};

export default BusinessRegistration;
