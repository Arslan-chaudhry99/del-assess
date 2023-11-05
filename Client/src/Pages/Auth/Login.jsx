import React from "react";
import { useFormik } from "formik";
import { signin } from "../../schemas/login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import { toast } from "react-toastify";
import { Container, TextField, Button, Typography } from "@mui/material";

const initialValues = {
  username: "",
  Password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signin,
      onSubmit: async (values, action) => {
        console.log(values);
        try {
          const res = await axios.post("http://localhost:4000/login", values);
          dispatch(
            setLogin({
              user: res.data.name,
              token: res.data.token,
            })
          );

          toast.success(res.data.message);
        } catch (error) {
          toast.error(error.message);
        }
        // action.resetForm();
      },
    });

  const handleLoginClick = () => {
    handleSubmit();
  };

  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Login
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
          <Typography
            variant="h6"
            align="right"
            sx={{ fontSize: "16px", textDecoration: "underline",cursor:"pointer" }}
            onClick={()=>{
              navigate("/signup")
            }}
            gutterBottom

          >
            Signup Now
          </Typography>
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

export default Login;
