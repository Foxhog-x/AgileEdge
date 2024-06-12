import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import loginimage from "../../assets/loginpage.jpg";
import styles from "./Loginpage.module.css";

// Define the TypeScript interface for form inputs
interface IFormInput {
  email: string;
  password: string;
}

// Define the validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Loginpage: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    let fetchLoginUrl: string;
    if (checked) {
      fetchLoginUrl = "http://localhost:8000/admin/login";
    } else {
      fetchLoginUrl = "http://localhost:8000/member/login";
    }
    console.log(fetchLoginUrl);
    fetch(fetchLoginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.left_content}>
        <img src={loginimage} alt="Login" />
      </div>
      <div className={styles.right_content}>
        <h2>Hi Welcome</h2>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Stack mt={3} gap={3}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                {...register("email")}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
            </Stack>
            <Stack
              flexDirection={"row"}
              mt={4}
              justifyContent={"space-between"}
              margin={5}
            >
              <FormControlLabel
                value="top"
                control={
                  <Switch
                    color="primary"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                }
                label="Admin Login"
                labelPlacement="end"
              />

              <Button type="submit" variant="contained" size="large">
                Submit
              </Button>
            </Stack>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
