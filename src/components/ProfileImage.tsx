import { Avatar } from "@mui/material";

export const ProfileImage = () => {
  return (
    <div className="flex items-center gap-4 py-6 px-6">
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 50, height: 50 }}
      />
      <h2 className="text-2xl">Onkar</h2>
    </div>
  );
};
