import NavButton from "./NavButton";
import { ProfileImage } from "./ProfileImage";
interface SidebarProps {
  setShowSidebar: (value: boolean) => void;
}
export default function Sidebar({ setShowSidebar }: SidebarProps) {
  return (
    <div>
      <ProfileImage />
      <NavButton setShowSidebar={setShowSidebar} />
    </div>
  );
}
