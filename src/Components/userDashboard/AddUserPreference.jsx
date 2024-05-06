// import React, { useState } from "react";
// import {
//   Button,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Modal,
//   Typography,
// } from "@mui/material";
// import axios from "axios";

// const AddUserPreference = ({ setPreferences }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleCategoryChange = event => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleSubmit = () => {
//     // Assuming the setPreferences function updates the state and refetches the offers
//     setPreferences(selectedCategory ? [selectedCategory] : []);
//     handleClose();
//   };

//   return (
//     <>
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Add Preference
//       </Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Select Your Preference
//           </Typography>
//           <FormControl fullWidth>
//             <InputLabel id="category-select-label">Category</InputLabel>
//             <Select
//               labelId="category-select-label"
//               id="category-select"
//               value={selectedCategory}
//               label="Category"
//               onChange={handleCategoryChange}
//             >
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               <MenuItem value="car">Car</MenuItem>
//               <MenuItem value="furniture">Furniture</MenuItem>
//               {/* ... other categories */}
//             </Select>
//           </FormControl>
//           <Button variant="contained" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default AddUserPreference;
