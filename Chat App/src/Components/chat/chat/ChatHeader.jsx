import { useContext } from "react";

import { Box, Typography, styled } from "@mui/material";
import { Search, MoreVert, ArrowBack } from "@mui/icons-material";

import { AccountContext } from "../../../context/AccountProvider";
import defaultProfilePicture from "../../../assets/defaultProfilePic.png";

let Mobile = window?.innerWidth <= 768 ? true : false;

const Header = styled(Box)`
  height: 44px;
  background: #ededed;
  display: flex;
  padding: ${Mobile ? "8px 10px" : "8px 16px"};
  align-items: center;
`;

const Image = styled("img")({
  width: 40,
  height: 40,
  objectFit: "cover",
  borderRadius: "50%",
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 22px;
    color: #000;
  }
`;

const Status = styled(Typography)`
  font-size: 12px !important;
  color: rgb(0, 0, 0, 0.6);
  margin-left: 12px !important;
`;

const ChatHeader = ({ person, mobile, setMobileRight }) => {
  const url =
    person.picture === "default"
      ? defaultProfilePicture
      : person.picture || defaultProfilePicture;

  const { activeUsers } = useContext(AccountContext);

  return (
    <Header>
      {mobile && (
        <ArrowBack
          style={{ cursor: "pointer", marginRight: "5px" }}
          onClick={() => setMobileRight(false)}
        />
      )}
      <Image src={url} alt="display picture" />
      <Box>
        <Name>{person.name}</Name>
        <Status>
          {activeUsers?.find((user) => user.sub === person.sub)
            ? "Online"
            : "Offline"}
        </Status>
      </Box>
      <RightContainer>
        {!Mobile && <Search />}
        <MoreVert />
      </RightContainer>
    </Header>
  );
};

export default ChatHeader;
