import { useState, useEffect, useContext, useRef } from "react";
import { Box, styled, Typography } from "@mui/material";
import { getMessages, newMessages } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";

//components
import Message from "./Message";
import Footer from "./Footer";
import { today } from "../../../utils/common-utils";
import Loader from "../../loader/Loader";

let mobile = window?.innerWidth <= 768 ? true : false;

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;

const Today = styled(Typography)`
  font-size: 13px;
  background: #f0f2f5;
  color: #919191;
  width: max-content;
  align-items: center;
  margin: auto;
  padding: 0 3px;
  border-radius: 5px;
  word-break: normal;
`;

const Component = styled(Box)`
  height: 78vh;
  overflow-y: scroll;
  padding: 10px 0;
`;

const Container = styled(Box)`
  padding: ${mobile ? "5px 15px" : "5px 30px"};
`;

const Messages = ({ person, conversation, loading, messages, setMessages }) => {
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [value, setValue] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const scrollRef = useRef();

  const { account, socket, newMessageFlag, setNewMessageFlag } =
    useContext(AccountContext);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessages(conversation?._id);
      setMessages(data);
    };
    conversation?._id && getMessageDetails();
  }, [conversation?._id, person._id, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  const receiverId = conversation?.members?.find(
    (member) => member !== account.sub
  );

  const sendText = async (e) => {
    let code = e.keyCode || e.which;

    if (code === 13) {
      await sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!value || value === "") return;
    let message = {};
    if (!file) {
      message = {
        senderId: account.sub,
        receiverId: receiverId,
        conversationId: conversation._id,
        type: "text",
        text: value,
      };
    } else {
      message = {
        senderId: account.sub,
        conversationId: conversation._id,
        receiverId: receiverId,
        type: "file",
        text: image,
      };
    }

    socket.current.emit("sendMessage", message);

    await newMessages(message);

    setValue("");
    setFile();
    setImage("");
    setNewMessageFlag((prev) => !prev);
  };

  console.log(messages, "123");

  return (
    <Wrapper>
      <Component>
        {loading ? (
          <div
            style={{
              display: "flex",
              margin: "auto",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <Container key={index} ref={scrollRef}>
              {today(message.createdAt, messages) && (
                <Today>{today(message.createdAt, messages)}</Today>
              )}
              <Message message={message} />
            </Container>
          ))
        ) : (
          <div className="OutlineContainer">
            <div className="Outline">
              <h4 className="OutlineContent">
                No Conversations with {person?.name} yet.
              </h4>
              <p className="OutlineContent">
                Start a conversation by sending a {'"Hi 👋".'}
              </p>
            </div>
          </div>
        )}
      </Component>
      <Footer
        sendText={sendText}
        value={value}
        setValue={setValue}
        setFile={setFile}
        file={file}
        setImage={setImage}
        sendMessage={sendMessage}
      />
    </Wrapper>
  );
};

export default Messages;
