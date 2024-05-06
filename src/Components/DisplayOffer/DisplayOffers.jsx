import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import EditedOffer from "../../utility/editedOffer/EditedOffer";
import { USER_TYPE } from "../../constant";
import ViewOfferDetail from "../../utility/modal/ViewOfferDetail/ViewOfferDetail";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const DisplayOffers = ({ offers, setOffers, userType }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "offers", id));
      const updatedOffers = offers.filter((offer) => offer.id !== id);
      setOffers(updatedOffers);
    } catch (error) {
      console.error("Error deleting the offer:", error);
    }
  };

  const handleEdit =async  (offer) => {
    setCurrentOffer(offer);
    setEditModalOpen(true);
  };
  // console.log(currentOffer);

  const handleUpdate = async (file) => {
    
    try {
      // Check if a new image has been selected for upload
      if (file) {
        // Generate a unique filename for the uploaded image
        const fileName = `${Date.now()}_${currentOffer.title}`;
        const storageRef = ref(storage , fileName);

        // Upload the new image to Firebase Storage
        const uploadTask = uploadBytesResumable(
          storageRef,
          file
        );

        // Listen for upload progress
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle upload progress if needed
          },
          (error) => {
            // Handle error during upload
            console.error("Error uploading image to storage:", error);
          },
          async () => {
            try {
              // Upload completed successfully, get download URL
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              // Update offer data with the new image URL and other modifications
              const updatedOfferData = {
                ...currentOffer,
                imageUrl: downloadURL,
                // Update other fields as needed
              };

              // Update the offer document in Firestore with the updated data
              await updateDoc(
                doc(firestore, "offers", currentOffer.id),
                updatedOfferData
              );

              // Update local state with the updated offer
              const updatedOffers = offers.map((existingOffer) =>
                existingOffer.id === currentOffer.id
                  ? updatedOfferData
                  : existingOffer
              );
              setOffers(updatedOffers);

              // Close the edit modal
              setEditModalOpen(false);
            } catch (error) {
              // Handle error updating offer in Firestore
              console.error("Error updating offer in Firestore:", error);
               }
          }
        );
      } else {
        // If no new image is selected, simply update the offer data in Firestore
        await updateDoc(
          doc(firestore, "offers", currentOffer.id),
          currentOffer
        );

        // Update local state with the updated offer
        const updatedOffers = offers.map((existingOffer) =>
          existingOffer.id === currentOffer.id ? currentOffer : existingOffer
        );
        setOffers(updatedOffers);

        // Close the edit modal
        setEditModalOpen(false);
      }
    
    }
     catch (error) {
      // Handle other errors
      console.error("Error updating offer:", error);
    }
  
  };

  const handleCardClick = (offer) => {
    setCurrentOffer(offer);
    if (userType === USER_TYPE.user) {
      setViewModalOpen(true);
    }
  };

  return (
    <Grid container spacing={3} sx={{ display: "flex", gap: "10px" }}>
      {offers.map((offer) => (
        <div
          className={`${
            userType === USER_TYPE.business ? "w-[90%]" : "w-[70%] ml-[10%]"
          }`}
        >
          <Card
            key={offer.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              p: 2,
              boxShadow: 3,
              margin: "10px",
              marginLeft: "10%",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(offer)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                width: "100%",
              }}
            >
              {offer.imageUrl && (
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100, borderRadius: "50%" }}
                  image={offer.imageUrl}
                  alt="Offer Image"
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <h2 className="fs-4 font-serif font-bold mb-3 ">
                  {offer.title}
                </h2>
                <h3 variant="body2" color="text.secondary" className="fs-6">
                  {offer.description}
                </h3>
                <footer>{offer.category}</footer>
              </CardContent>
            </Box>

            {userType === USER_TYPE.business && (
              <>
                <Button
                  sx={{
                    position: "absolute",
                    top: "30%",
                    right: 16,
                    zIndex: 10,
                  }}
                  variant="contained"
                  onClick={() => handleEdit(offer)}
                >
                  Update
                </Button>
                <Button
                  sx={{
                    position: "absolute",
                    top: "60%",
                    right: 16,
                    zIndex: 10,
                  }}
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(offer.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </Card>
        </div>
      ))}
      {editModalOpen && (
        <EditedOffer
          editModalOpen={editModalOpen}
          currentOffer={currentOffer}
          setCurrentOffer={setCurrentOffer}
          setEditModalOpen={setEditModalOpen}
          handleUpdate={handleUpdate}
        />
      )}
      {viewModalOpen && (
        <ViewOfferDetail
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          currentOffer={currentOffer}
        />
      )}
    </Grid>
  );
};

export default DisplayOffers;
