import React, { useState } from "react";
import { FaUserCog, FaEye } from "react-icons/fa";
import { Select, message } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { validateEmail } from "../validation";
import { InputLabel, MenuItem } from "@mui/material";
const UserRegistration = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");

  console.log(category);
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      message.error("Passwords do not match");
      return;
    }
    if (!country) {
      message.error("Please enter a valid name");
      return;
    }
    if(!category){
      message.error("Please enter a valid category");
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
  
    if (!role) {
      message.error("Please enter a business role");
      return;
    }
    if (!validateEmail(email)) {
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
        email,
        password  
      );
      // Add user registration data to Firestore collection
      await addDoc(collection(firestore, "users"), {
        uid:userCredential.user.uid,
        role:role,
        firstName: e.target["first-name"].value,
        lastName: e.target["last-name"].value,
        email: email,
        country: country,
        streetAddress: e.target["street-address"].value,
        city: e.target["city"].value,
        region: e.target["region"].value,
        postalCode: e.target["postal-code"].value,
        category
      });
    
      console.log("User registered successfully:");
      message.success("Registered successfully")
    } catch (error) {
      message.error("Failed to register user:", error.message)
      console.error("Failed to register user:", error.message);
    }
    }
  return (
    <>
      <form onSubmit={handleRegister}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <br />
          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Country
            </label>
            <div className="mt-2">
              <Select
                onChange={(value) => setCountry(value)}
                value={country}
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <Option value="United States">United States</Option>
                <Option value="Canada">Canada</Option>
                <Option value="Mexico">Mexico</Option>
              </Select>
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              State / Province
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <br />
          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
              required
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <InputLabel id="category">Preferred Business Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          multiple
            value={category}
            onChange={(value)=>{setCategory(value)}}
        >
          <MenuItem value="Car">Car</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
          <MenuItem value="Textile">Textile</MenuItem>
        </Select>
          <br />
          <div className="sm:col-span-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
              required
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <br />
          <div className="sm:col-span-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
              required
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-4">
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

export default UserRegistration;
