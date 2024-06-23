import { useContext, useState, useEffect } from "react";

import { Box } from "@mui/material";

import { UserContext } from "../../../context/UserProvider";
import { AccountContext } from "../../../context/AccountProvider";
import { getConversation, getMessages } from "../../../service/api";

//components
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

const ChatBox = ({ mobile = false, setMobileRight }) => {
  const { person } = useContext(UserContext);
  const { account } = useContext(AccountContext);

  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getConversationDetails = async () => {
      setLoading(true);
      let data = await getConversation({
        senderId: account.sub,
        receiverId: person.sub,
      });
      setConversation(data);
      let messages = await getMessages(data?._id);
      setMessages(messages);
      setLoading(false);
    };
    getConversationDetails();
  }, [person.sub]);

  return (
    <Box style={{ height: "75%" }}>
      <ChatHeader
        person={person}
        mobile={mobile}
        setMobileRight={setMobileRight}
      />
      <Messages
        person={person}
        conversation={conversation}
        loading={loading}
        messages={messages}
        setMessages={setMessages}
      />
    </Box>
  );
};

export default ChatBox;
