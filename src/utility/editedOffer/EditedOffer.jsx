import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Upload } from "antd";
import { categorydata } from "../../../src/constant";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

const EditedOffer = ({
  editModalOpen,
  setEditModalOpen,
  currentOffer,
  setCurrentOffer,
  handleUpdate,
}) => {
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(
    currentOffer.category === "other"
  );

  const handleCategoryChange = event => {
    const { value } = event.target;
    setIsOtherSelected(value === "other");
    setCurrentOffer(prev => ({
      ...prev,
      category: value === "other" ? prev.customCategory : value,
      customCategory: value === "other" ? prev.customCategory || "" : "",
    }));
  };
  
  useEffect(() => {
    if (currentOffer && currentOffer.image) {
      setPreviewImage(currentOffer.image);
      setFileList([{ uid: "-1", url: currentOffer.image, name: "Image" }]);
    }
  }, [currentOffer]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
     setFile(newFileList[0].originFileObj);
      getBase64(newFileList[0].originFileObj, imageUrl =>
        setCurrentOffer(prev => ({ ...prev, image: imageUrl }))
      );
    }
  };
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentOffer(prev => {
      const updatedOffer = { ...prev, [name]: value };
      return updatedOffer;
    });
  };

  const uploadButton = (
    <div>
      <Button>
        <PlusOutlined />
        <span style={{ marginLeft: 8 }}>Upload</span>
      </Button>
    </div>
  );

  return (
    <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Offer
        </Typography>
        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          name="title"
          value={currentOffer.title || ""}
          onChange={handleInputChange}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          name="description"
          value={currentOffer.description || ""}
          onChange={handleInputChange}
          sx={{ mt: 2 }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={currentOffer.category || ""}
            label="Category"
            name="category"
            onChange={handleCategoryChange}
          >
            {categorydata.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {isOtherSelected && (
          <TextField
            label="Specify Category"
            fullWidth
            variant="outlined"
            name="customCategory"
            value={currentOffer.customCategory || ""}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
        )}
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={file => {
            setPreviewOpen(true);
            setPreviewImage(file.url || file.preview);
          }}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Button
          onClick={() => handleUpdate(file)}
          color="primary"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditedOffer;
