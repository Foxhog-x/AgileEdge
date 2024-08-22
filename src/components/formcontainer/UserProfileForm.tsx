import { Label } from "@mui/icons-material";
import styles from "./Profile.module.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";

// Define your Zod schema
const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().optional(),
  image: z.instanceof(File).optional(),
});

type Inputs = z.infer<typeof schema>;

interface FileDetails {
  name: string;
  size: number;
}

interface UserProfileFormProps {
  currentUser: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    image?: string;
  };
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  currentUser,
}) => {
  const [fileDetails, setFileDetails] = useState<FileDetails | null>();
  const [preview, setPreview] = useState<string | null>(
    currentUser.image || null
  );
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const axiosInstance = useCustomAxios();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      address: currentUser.address,
      // file inputs don’t support default values directly
    },
    resolver: zodResolver(schema),
  });

  function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(",")[1]); // Remove the data URL prefix
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axiosInstance.post(urls.myUserUpdate, { image: imageBase64, data });
      setImageBase64(null);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileDetails((prev) => ({
        ...prev,
        name: file?.name,
        size: file.size / (1024 * 1024),
      }));
      try {
        const base64 = await convertFileToBase64(file);
        setImageBase64(base64);
        setPreview(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
      setValue("image", file);
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  return (
    <>
      <div className="container flex flex-col gap-52 p-4">
        <div className="p-4 mt-5 ">
          <div className="flex flex-col">
            <h1>User Profile</h1>
          </div>
          <div className="border-blue-600 md:w-1/2">
            <div className="flex justify-between  gap-5 p-2 mr-4">
              <div className="flex flex-1 gap-10">
                <div className="flex flex-col  gap-3 w-1/2 mt-5 ">
                  <div className="flex flex-col gap-10">
                    <button
                      onClick={handleButtonClick}
                      style={{
                        padding: "1rem",
                        borderRadius: "1rem",
                        display: "flex",
                        alignContent: "center",
                        gap: 6,
                      }}
                    >
                      <PhotoCameraIcon />
                      Add Profile Photo here
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        {...register("image")}
                        onChange={(e) => handleFileChange(e)}
                      />
                    </button>
                    <img
                      src={
                        preview ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      }
                      alt="Profile Preview"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        marginBottom: 20,
                        objectFit: "cover",
                        border: "2px solid #ddd",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between  gap-5 p-2 mr-4">
                <div className="flex-1 md:flex gap-10">
                  <div className="flex flex-col flex-1 gap-3    mt-5 ">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="p-3 border border-gray-400"
                      {...register("firstName")}
                    />
                  </div>
                  <div className="flex flex-col flex-1 gap-3 mt-5">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="p-3 border border-gray-400"
                      {...register("lastName")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between  gap-5 p-2 mr-4">
                <div className="flex flex-1 gap-10">
                  <div className="flex flex-col flex-1 gap-3 w-1/2 mt-5 ">
                    <label>Email</label>
                    <input
                      type="text"
                      className="p-3 border border-gray-400"
                      {...register("email")}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between  gap-5 p-2 mr-4">
                <div className="flex flex-1 gap-10">
                  <div className="flex flex-col flex-1 gap-3 w-1/2 mt-5 ">
                    <label>Address</label>
                    <textarea
                      rows={5}
                      className="p-3 border border-gray-400"
                      {...register("address")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between  gap-5 p-2 mr-4">
                <div className="flex flex-1 gap-10">
                  <div className="flex flex-1 gap-10 justify-end  mt-8 ">
                    <Button
                      variant="contained"
                      type="submit"
                      style={{
                        padding: 12,
                        minWidth: 100,
                        borderRadius: "1rem",
                        backgroundColor: "#3ABEF9",
                        color: "black",
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
