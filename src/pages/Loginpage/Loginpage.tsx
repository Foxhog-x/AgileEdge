import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  email: z.string().email("email is invalid"),
  password: z.string().min(4, "password must content 4 characters"),
});

type UserFormData = z.infer<typeof formSchema>;
import styles from "./Loginpage.module.css";
import { Box, Button, Stack, TextField } from "@mui/material";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import {
  addTokenData,
  addUsersDataLocally,
  removeTokenData,
} from "../../services/localStorage/authUtil";
import { useToastStore } from "../../store/useToastStore";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useBackdropStore from "../../store/useBackdropStore";
export default function Loginpage() {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const { register, handleSubmit, reset } = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
  });
  const axiosInstance = useCustomAxios();
  const onsubmit: SubmitHandler<UserFormData> = async (data: UserFormData) => {
    try {
      showBackdrop();
      const response = await axiosInstance.post(urls.memberLogin, data);
      addToast(response.data.message, "success");
      const { token } = response.data;
      try {
        removeTokenData();
        addTokenData(token);
        const userData = response.data.result[0];
        addUsersDataLocally(userData);
        navigate("/");
        hideBackdrop();
      } catch (error) {
        hideBackdrop();
        console.log(error, "error while storing token in localstorage");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        console.log(errorMessage);
        addToast(errorMessage, "error");
      } else {
        console.log("An unexpected error occurred");
        addToast("An unexpected error occurred", "error");
      }
    }
    reset();
  };

  return (
    <div>
      <div className={styles.main_container}>
        <div className={styles.left_content}></div>
        <div className={styles.right_content}>
          <h2>Hi Welcome</h2>
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onsubmit)}>
            <Box>
              <Stack mt={3} gap={3}>
                <TextField
                  autoComplete="true"
                  id="email"
                  label="Email"
                  variant="outlined"
                  {...register("email")}
                />
                <TextField
                  autoComplete="false"
                  id="password"
                  label="Password"
                  variant="outlined"
                  {...register("password")}
                />
              </Stack>
              <Stack
                flexDirection={"row"}
                mt={4}
                justifyContent={"space-between"}
              >
                <Button type="submit" variant="contained" size="large">
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")}>
                  Create new Account
                </Button>
              </Stack>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}
