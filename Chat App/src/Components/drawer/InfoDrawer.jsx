import { styled, Drawer, Box, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

//components
import Profile from "./Profile";

let tab = window?.innerWidth <= 900 ? true : false;

let mobile = window?.innerWidth <= 768 ? true : false;

const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #ffffff;
  display: flex;
  & > svg,
  & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
  }
`;

const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`;

const Text = styled(Typography)`
  font-size: 18px;
`;

const drawerStyle = {
  left: 20,
  top: "2.5%",
  height: "95%",
  width: tab ? (mobile ? "60%" : "40%") : "30%",
  boxShadow: "none",
};

// eslint-disable-next-line react/prop-types
const InfoDrawer = ({ open, setOpen, profile }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: drawerStyle }}
      style={{ zIndex: 1500 }}
    >
      <Header>
        <ArrowBack
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(false)}
        />
        <Text>Profile</Text>
      </Header>
      <Component>{profile && <Profile />}</Component>
    </Drawer>
  );
};

export default InfoDrawer;
