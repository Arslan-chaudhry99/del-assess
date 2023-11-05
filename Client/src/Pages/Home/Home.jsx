import React from "react";
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Post } from "../../schemas/Post";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state/index";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import DeleteRounded from "@mui/icons-material/DeleteRounded";

// form data
const initialValues = {
  model: "",
  Price: "",
  phone: "",
  location: "",
  copies: "",
  file: "",
};

// drop down style
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const token = useSelector((state) => state.token);

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: Post,
    onSubmit: async (values, action) => {
      try {
        const formData = new FormData();
        formData.append("model", values.model);
        formData.append("Price", values.Price);
        formData.append("phone", values.phone);
        formData.append("location", values.location);
        formData.append("copies", values.copies);

        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append(`files`, selectedFiles[i]);
        }

        const res = await axios.post(
          "http://localhost:4000/creatpost",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 201) {
          toast.success(res.data.message);
          setSelectedFiles([])
          return action.resetForm();
        }
      } catch (error) {
        toast.error(" Server Error!");
        action.resetForm();
      }
    },
  });

  // Set File
  const handleFileChange = (e) => {
   
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, files[0]]);
    setFieldValue("file", [...selectedFiles, files[0]]);
  };

  // Delete file
  const deleteImage = (ID) => {
    setSelectedFiles(selectedFiles.filter((data) => data.name !== ID));
  };
  // Handle Submit
  const submitFile = () => {
    handleSubmit();
  };
  // drop Down Value
  const names = ["1", "2", "3", "4", "5", "6"];

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" mt="40px" gutterBottom>
          Create a Product Post
        </Typography>
       
        <TextField
          label="Car Model"
          fullWidth
          margin="normal"
          variant="outlined"
          name="model"
          value={values.model}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors.model ? true : false}
        />
        <TextField
          label="Price"
          fullWidth
          margin="normal"
          variant="outlined"
          type="text"
          name="Price"
          value={values.Price}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors.Price ? true : false}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          variant="outlined"
          type="Text"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors.phone ? true : false}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend" error={errors.location ? true : false}>
            Select an option:
          </FormLabel>
          <RadioGroup
            aria-label="options"
            name="location"
            sx={{ display: "flex", flexDirection: "row" }}
            defaultValue={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <FormControlLabel
              value="Lahore"
              control={<Radio />}
              label="Lahore"
            />
            <FormControlLabel
              value="Karachi"
              control={<Radio />}
              label="Karachi"
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          sx={{
            m: 0,
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          error={errors.copies ? true : false}
        >
          <InputLabel id="demo-multiple-name-label">Copies</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            input={<OutlinedInput label="Name" />}
            name="copies"
            MenuProps={MenuProps}
            value={values.copies}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={2} mb={2}>
          {selectedFiles.length !== 4 ? (
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ color: `${errors.file ? "red" : ""}` }}
            />
          ) : null}

          <Box mt={4}>
            <Grid container spacing={2}>
              {selectedFiles.map((file, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Card sx={{ position: "relative" }}>
                    <DeleteRounded
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        deleteImage(file.name);
                      }}
                      error={errors.image ? true : false}
                    />
                    <CardMedia
                      component="img"
                      alt={`Image ${index + 1}`}
                      height="140"
                      image={URL.createObjectURL(file)}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            submitFile();
          }}
          fullWidth
        >
          Create Post
        </Button>
      </Container>
    </>
  );
};

export default Home;
