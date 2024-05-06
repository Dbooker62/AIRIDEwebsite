import React from "react";
import { Modal } from "antd";
import { Button, Box } from "@mui/material";

const ViewOfferDetail = ({
  ViewModalOpen,
  setViewModalOpen,
  currentOffer,
  handleDetail,
}) => {
  // Function to directly close the modal
  const handleClose = () => {
    setViewModalOpen(false); // Directly set to false for predictable behavior
    if (handleDetail) {
      handleDetail(currentOffer.id); // Assuming handleDetail does something with the current offer's ID
    }
  };

  return (
    <div className="w-1/2">
      <Modal
        title="Offer Details"
        onClose={handleClose}
        onCancel={handleClose}
        open={!ViewModalOpen}
        footer={[
          <p className="font-bold font-serif fs-4">{currentOffer.category}</p>,
        ]}
      >
        {currentOffer && (
          <Box sx={{ p: 3 }}>
            {currentOffer.image && (
              <div className="flex justify-center">
                <img
                  src={currentOffer.image}
                  alt="Offer"
                  className="w-1/2 rounded-xl"
                />
              </div>
            )}
            <div className="flex flex-column font-serif  gap-2">
              <h1 className="fs-4 mt-10 font-bold">{currentOffer.title}</h1>
              <p className="fs-5 ">{currentOffer.description}</p>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default ViewOfferDetail;
