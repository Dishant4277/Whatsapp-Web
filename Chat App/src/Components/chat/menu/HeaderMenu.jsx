import { useState, useContext } from "react";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem, styled } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import { AccountContext } from "../../../context/AccountProvider";
import { UserContext } from "../../../context/UserProvider";
import InfoDrawer from "../../drawer/InfoDrawer";

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  padding: 15px 60px 5px 24px;
  color: #4a4a4a;
`;

const HeaderMenu = () => {
  const [open, setOpen] = useState({ target: null, visible: false });
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    setAccount,
    setShowloginButton,
    showlogoutButton,
    setShowlogoutButton,
  } = useContext(AccountContext);
  const { setPerson } = useContext(UserContext);

  const handleClick = (event) => {
    setOpen({ target: event.currentTarget, visible: true });
  };

  const handleClose = () => {
    setOpen({ target: null, visible: false });
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setShowlogoutButton(false);
    setShowloginButton(true);
    setAccount("");
    setPerson({});
  };

  return (
    <>
      <MoreVert onClick={handleClick} style={{ cursor: "pointer" }} />
      <Menu
        anchorEl={open.target}
        keepMounted
        open={open.visible}
        onClose={handleClose}
        getcontentanchorel={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuOption
          onClick={() => {
            handleClose();
            setOpenDrawer(true);
          }}
        >
          Profile
        </MenuOption>
        {showlogoutButton && (
          <MenuOption
            onClick={() => {
              handleClose();
              googleLogout();
              onSignoutSuccess();
            }}
          >
            Logout
          </MenuOption>
        )}
      </Menu>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
    </>
  );
};

export default HeaderMenu;
