import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
// import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";

export const SidebarData = [
  {
    title: "MyComplaint",
    icon: <MapsHomeWorkIcon />,
    path: "/mycomplaint",
  },
  {
    title: "Register Complaint",
    icon: <HowToRegIcon />,
    path: "/registercomplaint",
  },
  // {
  //   title: "Setting",
  //   icon: <SettingsIcon />,
  //   path: "/setting",
  // },
  {
    title: "About Us!",
    icon: <InfoIcon />,
    path: "/aboutus",
  },
  {
    title: "LogOut",
    icon: <LogoutIcon />,
    isLogout: true,
  },
];
