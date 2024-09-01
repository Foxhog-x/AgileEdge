import { useEffect, useState } from "react";
import { UserProfileForm } from "../../components/formcontainer/UserProfileForm";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import useBackdropStore from "../../store/useBackdropStore";

const Userprofilepage = () => {
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const [currentDetails, setCurrentDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    avatar: "",
  });
  const axiosInstance = useCustomAxios();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getUserProfile = async () => {
    try {
      showBackdrop();
      const response = await axiosInstance.get(urls.getUserProfile);
      const data = response.data.result;

      setCurrentDetails((prev) => {
        return {
          ...prev,
          avatar: data[0]?.avatar,
          firstName: data[0]?.first_name,
          lastName: data[0]?.last_name,
          email: data[0]?.email,
          address: data[0]?.address,
        };
      });
      hideBackdrop();
    } catch (error) {
      console.log(error);
    }
  };

  const currentUser = {
    firstName: currentDetails.firstName,
    lastName: currentDetails.lastName,
    email: currentDetails.email,
    address: currentDetails.address,
    avatar: currentDetails.avatar,
  };
  const handleCallback = () => {
    getUserProfile();
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  if (!currentUser) {
    return <>Loading</>;
  }
  return (
    <UserProfileForm
      sendFunctionToParent={handleCallback}
      currentUser={currentUser}
    />
  );
};

export default Userprofilepage;
