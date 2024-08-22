import styles from "./Profile.module.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
interface FileDetails {
  name: string;
  size: number;
}
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  image: File | null;
};

export const UserProfileForm = () => {
  const [fileDetails, setFileDetails] = useState<FileDetails | null>();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("address", data.address);
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileDetails((prev) => {
        return { ...prev, name: file?.name, size: file.size / (1024 * 1024) };
      });
    }
    console.log(file);
    setValue("image", file);
  };
  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const formatToTwoDecimalPlaces = (num: number): number => {
    const size = Math.floor(num * 100) / 100;
    return size;
  };

  return (
    <>
      <div className="container">
        <div className="p-3 mt-5 ml-12">
          <h1>User Profile</h1>

          <div className="flex border justify-between border-blue-600 w-1/3 gap-5">
            <div className="flex flex-col gap-3 w-1/2 mt-5 ">
              <label>FirstName</label>
              <input type="text" className="" />
            </div>
            <div className="flex flex-col gap-3 w-1/2 mt-5">
              <label>FirstName</label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
