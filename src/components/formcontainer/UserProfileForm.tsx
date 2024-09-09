import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { useToastStore } from "../../store/useToastStore";

interface UserProfileFormProps {
  currentUser: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    avatar?: string;
  };
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  currentUser,
}) => {
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    address: currentUser?.address || "",
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { addToast } = useToastStore();
  const axiosInstance = useCustomAxios();

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        address: currentUser.address,
        image: null,
      });
    }
  }, [currentUser]);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(",")[1]);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        addToast("File size should not exceed 2 MB", "error");
        return;
      }
      try {
        const base64 = await convertFileToBase64(file);
        setImageBase64(base64);
        setPreview(URL.createObjectURL(file));
        setFormData({ ...formData, image: file });
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const validateForm = () => {
    if (!formData.firstName || formData.firstName.length < 2) {
      addToast(
        "First name is required and must be at least 2 characters",
        "error"
      );
      return false;
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      addToast(
        "Last name is required and must be at least 2 characters",
        "error"
      );
      return false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      addToast("Invalid email address", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axiosInstance.post(urls.myUserUpdate, {
        image: imageBase64,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
        },
      });
      addToast("Profile updated successfully", "success");
      setImageBase64(null);
    } catch (error) {
      console.error("Error submitting form", error);
      addToast("Failed to update profile", "error");
    }
  };

  return (
    <div className="container flex flex-col gap-52 p-4">
      <div className="p-4 mt-5">
        <div className="flex flex-col">
          <h1>User Profile</h1>
        </div>
        <div className="border-blue-600 md:w-1/2">
          <div className="flex justify-between gap-5 p-2 mr-4">
            <div className="flex flex-1 gap-10">
              <div className="flex flex-col gap-3 w-1/2 mt-5">
                <div className="flex flex-col gap-10">
                  <button
                    onClick={handleButtonClick}
                    style={{
                      padding: "1rem",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
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
                      onChange={handleFileChange}
                    />
                  </button>
                  <img
                    src={
                      preview || `data:image/jpeg;base64,${currentUser.avatar}`
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
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-5 p-2 mr-4">
              <div className="flex-1 md:flex gap-10">
                <div className="flex flex-col flex-1 gap-3 mt-5">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="p-3 border border-gray-400"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-3 mt-5">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="p-3 border border-gray-400"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-5 p-2 mr-4">
              <div className="flex-1 md:flex gap-10">
                <div className="flex flex-col flex-1 gap-3 mt-5">
                  <label>Email</label>
                  <input
                    type="text"
                    className="p-3 border border-gray-400"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-5 p-2 mr-4">
              <div className="flex-1 md:flex gap-10">
                <div className="flex flex-col flex-1 gap-3 mt-5">
                  <label>Address</label>
                  <textarea
                    rows={5}
                    className="p-3 border border-gray-400"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-5 p-2 mr-4">
              <div className="flex flex-1 gap-10 justify-end mt-8">
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
          </form>
        </div>
      </div>
    </div>
  );
};
