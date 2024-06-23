import { useContext, useEffect, useState } from "react";

import { styled, Box, Typography } from "@mui/material";

import { UserContext } from "../../../context/UserProvider";
import { AccountContext } from "../../../context/AccountProvider";

import { setConversation, getConversation } from "../../../service/api";
import { emptyProfilePicture } from "../../../constants/data";
import defaultProfilePicture from "../../../assets/defaultProfilePic.png";

import { formatDate } from "../../../utils/common-utils";

let mobile = window?.innerWidth <= 768 ? true : false;

const Component = styled(Box)`
  height: 45px;
  display: flex;
  padding: 13px 0;
  cursor: pointer;
  width: 100%;
`;

const Image = styled("img")({
  width: 45,
  height: 45,
  objectFit: "cover",
  borderRadius: "50%",
  margin: "0 15px",
});

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
`;

const Timestamp = styled(Typography)`
  font-size: 12px;
  color: #00000099;
`;

const Text = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 80%;
  padding: 0 10px 0 10px;
`;

const Conversation = ({ user, setMobileRight }) => {
  const url = user.picture || emptyProfilePicture;

  const { setPerson } = useContext(UserContext);
  const { account, newMessageFlag } = useContext(AccountContext);

  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationMessage = async () => {
      const data = await getConversation({
        senderId: account.sub,
        receiverId: user.sub,
      });
      setMessage({ text: data?.message, timestamp: data?.updatedAt });
    };
    getConversationMessage();
  }, [newMessageFlag]);

  const getUser = async () => {
    setPerson(user);
    if (setMobileRight) {
      setMobileRight(true);
    }
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component onClick={() => getUser()}>
      <Box style={{ width: mobile ? "fit-content" : "20%" }}>
        <Image
          src={
            url === "default"
              ? defaultProfilePicture
              : url || defaultProfilePicture
          }
          alt="display picture"
        />
      </Box>
      <Box style={{ width: "80%" }}>
        <Container>
          <Typography>{user.name}</Typography>
          {message?.text && (
            <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          )}
        </Container>
        <Box>
          <Text>
            {message?.text?.includes("http") ? "media" : message.text}
          </Text>
        </Box>
      </Box>
    </Component>
  );
};

export default Conversation;
