import { useContext, useState } from "react";

import { Box, styled } from "@mui/material";
import { Chat as MessageIcon } from "@mui/icons-material";

import { AccountContext } from "../../../context/AccountProvider";
import HeaderMenu from "./HeaderMenu";

import InfoDrawer from "../../drawer/InfoDrawer";
import defaultProfilePicture from "../../../assets/defaultProfilePic.png";

const Component = styled(Box)`
  height: 44px;
  background: #ededed;
  display: flex;
  padding: 8px 16px;
  align-items: center;
`;

const Wrapper = styled(Box)`
  margin-left: auto;
  & > * {
    margin-left: 2px;
    padding: 8px;
    color: #000;
  }
  & :first-of-type {
    font-size: 22px;
    margin-right: 8px;
    margin-top: 3px;
  }
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%",
  cursor: "pointer",
});

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { account } = useContext(AccountContext);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <Component>
        <Image
          src={
            account.picture === "default"
              ? defaultProfilePicture
              : account.picture || defaultProfilePicture
          }
          onClick={() => toggleDrawer()}
        />
        <Wrapper>
          <MessageIcon />
          <HeaderMenu />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
    </>
  );
};

export default Header;
