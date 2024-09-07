import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { useToastStore } from "../../store/useToastStore";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Signuppage.module.css";
import useBackdropStore from "../../store/useBackdropStore";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  memberName: z.string().min(3, "Member name should be more than 3 characters"),
  email: z.string().email("Email is invalid"),
  password: z.string().min(4, "Password must contain at least 4 characters"),
});

type UserFormData = z.infer<typeof formSchema>;

export default function Signuppage() {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
  });
  const axiosInstance = useCustomAxios();

  const onsubmit: SubmitHandler<UserFormData> = async (data: UserFormData) => {
    showBackdrop();
    try {
      const response = await axiosInstance.post(urls.createMember, data);
      addToast(response.data.message, "success");
      navigate("/login");
      reset();
      hideBackdrop();
    } catch (error) {
      hideBackdrop();
      console.log(error, "Error while storing token in local storage");
    }
  };

  return (
    <div>
      <div className={styles.main_container}>
        <div className={styles.left_content}></div>
        <div className={styles.right_content}>
          <h2>Create An AgileEdge Account</h2>
          <h1>Signup</h1>
          <form onSubmit={handleSubmit(onsubmit)}>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Stack
                flexDirection={"row"}
                mt={3}
                gap={5}
                justifyContent={"space-between"}
                flex={1}
              >
                <TextField
                  autoComplete="true"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
                <TextField
                  fullWidth
                  autoComplete="false"
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Stack>
              <Stack mt={3} flex={1}>
                <TextField
                  fullWidth
                  autoComplete="false"
                  id="memberName"
                  label="Member Name"
                  variant="outlined"
                  {...register("memberName")}
                  error={!!errors.memberName}
                  helperText={errors.memberName?.message}
                />
              </Stack>
              <Stack mt={3} gap={2}>
                <TextField
                  autoComplete="true"
                  id="email"
                  label="Email"
                  variant="outlined"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  autoComplete="false"
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Stack>
              <Stack
                flexDirection={"column"}
                mt={4}
                gap={3}
                justifyContent={"space-between"}
              >
                <Button type="submit" variant="contained" size="large">
                  Signup
                </Button>
                <Button onClick={() => navigate("/login")}>Login</Button>
              </Stack>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}
