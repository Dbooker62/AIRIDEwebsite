import React, { useEffect, useState } from "react";
import { Modal, Upload, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { auth, firestore, storage } from "../../firebase";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const containerStyle = {
  width: "100%",
  height: "300px",
};
const center = {
  lat: 34.0522, // Default to Los Angeles as central point
  lng: -118.2437,
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AddOfferModal = ({ fetchOffers }) => {
  const [open, setOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [location, setLocation] = useState(center);
  const [searchBox, setSearchBox] = useState(null);
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    customCategory: "",
    location: "",
  });
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsOtherSelected(false);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(firestore, "categories-list");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesData = categoriesSnapshot.docs.map(
          (doc) => doc.data().category
        );
        setCategory(categoriesData[0]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  },[category]);

  const handleMapOpen = () => setMapOpen(!mapOpen);
  const handleMapClose = () => setMapOpen(mapOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "category" && value === "others") {
      setIsOtherSelected(!isOtherSelected);
    } else {
      setIsOtherSelected(isOtherSelected);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(!previewOpen);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const file = newFileList[0].originFileObj;
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));
    }
  };

  const onPlacesLoaded = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    const loc = places[0].geometry.location;
    setLocation({ lat: loc.lat(), lng: loc.lng() });
    formData.location = `${loc.lat()}, ${loc.lng()}`;
    handleMapClose();
  };

  const handleGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        setLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        formData.location = `${coords.latitude}, ${coords.longitude}`;
        handleMapClose();
      });
    }
  };

  const handleSubmit = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("No user is currently logged in");
      return;
    }

    try {
      message.loading("Adding offer");
      // Generate a unique filename for the uploaded image
      const fileName = `${Date.now()}_${formData.title}`;
      const storageRef = ref(storage, fileName);
      // Upload image to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, formData.image);

      // Listen for upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          // Handle error during upload
          console.error("Error uploading image to storage:", error);
          message.error("Failed to add offer");
        },
        async () => {
          try {
            const { image, ...formDataWithoutImage } = formData;
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const categoryDocRef = doc(firestore, "categories-list", "category");
            const categoryDocSnapshot = await getDoc(categoryDocRef);
            const categoryData = categoryDocSnapshot.data();
            const existingCategories = categoryData.category;
            if (!existingCategories.includes(formData.customCategory)) {
              const updatedCategories = [...existingCategories, formData.customCategory];
                await setDoc(categoryDocRef, { category: updatedCategories });
                setCategory(category)
                console.log("Custom category added to existing array:", formData.customCategory);
            }
 
            // Include the download URL in the submitData object
            const submitData = {
              ...formDataWithoutImage,
              imageUrl: downloadURL,
              email: currentUser.email,
              category: isOtherSelected
                ? formData.customCategory
                : formData.category,
            };

            // Add offer data to Firestore
            const docRef = await addDoc(
              collection(firestore, "offers"),
              submitData
            );

            if (docRef) {
              message.success("Offer added successfully!");
            }

            // Fetch updated offers and reset form state
            fetchOffers();
            handleClose();
            setFormData({
              title: "",
              description: "",
              category: "",
              customCategory: "",
            });
            setFileList([]);
            setPreviewImage("");
          } catch (error) {
            // Handle error adding document to Firestore
            console.error("Error adding document to Firestore:", error);
            message.error("Failed to add offer");
          }
        }
      );
    } catch (error) {
      // Handle other errors
      console.error("Error posting data:", error);
      message.error("Failed to add offer");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="p-10">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Offer
      </Button>
      <Modal
        open={open}
        closable={handleClose}
        onCancel={handleClose}
        title="Add a New Offer"
        footer={[<Button disabled={true}>close</Button>]}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Stack spacing={2}>
            <TextField
              label="Offer Title"
              fullWidth
              variant="outlined"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={isOtherSelected ? "other" : formData.category}
                label="Category"
                name="category"
                onChange={handleInputChange}
              >
                {category.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
                <MenuItem key="others" value="others">
                    Others
                  </MenuItem>
              </Select>
            </FormControl>
            {isOtherSelected && (
              <TextField
                label="Specify Category"
                fullWidth
                variant="outlined"
                name="customCategory"
                value={formData.customCategory}
                onChange={handleInputChange}
              />
            )}
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (vis) => setPreviewOpen(vis),
                }}
                src={previewImage}
              />
            )}
            <Button variant="contained" onClick={handleMapOpen}>
              Add Location
            </Button>

            <LoadScript
              googleMapsApiKey="AIzaSyBWVWXEFmeiVZhzpgzoqiy4tcyGvMB6g14" // Replace with your actual API key.
              libraries={["places"]}
            >
              {mapOpen && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={location}
                  zoom={15}
                >
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
              )}
            </LoadScript>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default AddOfferModal;
