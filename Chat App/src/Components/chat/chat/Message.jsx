import { useContext } from "react";

import { Box, styled, Typography } from "@mui/material";
import { GetApp as GetAppIcon } from "@mui/icons-material";

import { AccountContext } from "../../../context/AccountProvider";

import {
  downloadMedia,
  formatDate,
  formatDateMonth,
} from "../../../utils/common-utils";
import iconPdf from "../../../assets/docImage.png";

const Wrapper = styled(Box)`
  background: #ffffff;
  padding: 5px;
  max-width: 60%;
  width: max-content;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  word-break: break-word;
`;

const Own = styled(Box)`
  background: #dcf8c6;
  padding: 5px;
  max-width: 60%;
  width: max-content;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 5px 0 5px;
`;

const Time = styled(Box)`
  font-size: 10px;
  color: #919191;
  margin-top: auto;
  margin-left: auto;
  width: 50px;
  padding: 0;
`;

const Message = ({ message }) => {
  const { account } = useContext(AccountContext);

  return (
    <>
      {account.sub === message.senderId ? (
        <Own>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Own>
      ) : (
        <Wrapper>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Wrapper>
      )}
    </>
  );
};

const TextMessage = ({ message }) => {
  return (
    <>
      <Text>{message.text}</Text>
      <Time>
        {formatDate(message.createdAt)}
        <br />
        {formatDateMonth(message.createdAt)}
      </Time>
    </>
  );
};

const ImageMessage = ({ message }) => {
  return (
    <div style={{ position: "relative", height: "max-content" }}>
      {/\.(jpg|jpeg|png|gif|bmp)$/i.test(message?.text) ? (
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={message.text}
          alt={message.text}
        />
      ) : (
        <div style={{ display: "flex" }}>
          <img
            src={iconPdf}
            alt="pdf-icon"
            style={{ width: 50, padding: "5px" }}
          />
          <Typography style={{ fontSize: 14 }}>
            {message.text.split("/").pop()}
          </Typography>
        </div>
      )}
      <div style={{ display: "flex", padding: "5px" }}>
        <GetAppIcon
          onClick={(e) => downloadMedia(e, message.text)}
          fontSize="small"
          style={{
            border: "1px solid grey",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
        <Time style={{ position: "relative", bottom: 0, right: 0 }}>
          {formatDate(message.createdAt)}
          <br />
          {formatDateMonth(message.createdAt)}
        </Time>
      </div>
    </div>
  );
};

export default Message;
