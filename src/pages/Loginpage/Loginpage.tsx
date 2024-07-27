import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Loginpage.module.css";
import useBackdropStore from "../../store/useBackdropStore";
import { useToastStore } from "../../store/useToastStore";
import { SimpleSnackbar } from "../../components/toast/SimpleSnackbar";

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
    .min(5, "Password must be at least 6 characters")
    .required("Password is required"),
});
interface LoginData {
  email: string;
  password: string;
}

const Loginpage: React.FC = () => {
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const { addToast } = useToastStore();
  const [checked, setChecked] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const fetchLoginUrl = async (url: string, data: LoginData) => {
    showBackdrop();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        hideBackdrop();
        addToast("Login Successful", "success");
      } else {
        console.error(
          `Error: Received response with status code ${response.status}`
        );
        if (response.status === 400) {
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch error", error);

      hideBackdrop();
    }
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (checked) {
      fetchLoginUrl("http://localhost:8000/admin/login", data);
    } else {
      fetchLoginUrl("http://localhost:8000/member/login", data);
    }
  };

  return (
    <div>
      <div className={styles.main_container}>
        <div className={styles.left_content}></div>
        <div className={styles.right_content}>
          <h2>Hi Welcome</h2>
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Stack mt={3} gap={3}>
                <TextField
                  autoComplete="true"
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
                  Login
                </Button>
              </Stack>
            </Box>
          </form>
        </div>
        <SimpleSnackbar />
      </div>
    </div>
  );
};

export default Loginpage;
