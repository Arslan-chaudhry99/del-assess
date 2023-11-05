import React from "react";
import { useFormik } from "formik";
import { signup } from "../../schemas";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, TextField, Button, Typography } from "@mui/material";

const initialValues = {
  username: "",
  Password: "",
};
const Signup = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signup,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post("http://localhost:4000/signup", values);
          if (res.status === 201) {
            toast.success("User Created");
            return navigate("/loign");
          }
          return action.resetForm();
        } catch (error) {}
        return toast.error("Error 500");
        action.resetForm();
      },
    });
    const handleLoginClick = () => {
      handleSubmit();
    };
  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        <form>
          <TextField
            label={`${errors.username ? "Username Required" : "Username"}`}
            name="username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
          />
          <TextField
            label={`${touched.Password ? "Password Required" : "Password"}`}
            name="Password"
            fullWidth
            margin="normal"
            variant="outlined"
            type="Password"
            value={values.Password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.Password}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLoginClick} 
          >
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Signup;
