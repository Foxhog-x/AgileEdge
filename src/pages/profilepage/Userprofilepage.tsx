import { UserProfileForm } from "../../components/formcontainer/UserProfileForm";
import { useLocation } from "react-router-dom";

const Userprofilepage = () => {
  const location = useLocation();
  const { firstName, lastName,email,address,avatar } = location.state || {};
  

  const currentUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
    avatar: avatar,
  };
   
  if (!currentUser) {
    return <>Loading</>;
  }
  return (
    <UserProfileForm
      currentUser={currentUser}
    />
  );
};

export default Userprofilepage;
