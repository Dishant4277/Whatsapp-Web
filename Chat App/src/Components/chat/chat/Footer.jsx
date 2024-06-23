import { useEffect } from "react";

import { EmojiEmotions, AttachFile, Mic, Send } from "@mui/icons-material";
import { Box, styled, InputBase } from "@mui/material";

import { uploadFile } from "../../../service/api";

const mobile = window?.innerWidth <= 768 ? true : false;
const smallMobile = window?.innerWidth <= 400 ? true : false;

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  align-items: center;
  padding: ${mobile ? "1px 5px" : "1px 15px"};
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  border-radius: 18px;
  background-color: #ffffff;
  width: ${mobile
    ? smallMobile
      ? "42.5%"
      : "calc(70% - 50px)"
    : "calc(94% - 130px)"};
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  padding-left: 25px;
  font-size: 14px;
  height: 20px;
  width: 100%;
`;

const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
`;

const Footer = ({
  sendText,
  setValue,
  value,
  file,
  setFile,
  setImage,
  sendMessage,
}) => {
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setImage(response.data);
      }
    };
    getImage();
  }, [file]);

  const onFileChange = (e) => {
    setValue(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  return (
    <Container>
      <EmojiEmotions />
      <label htmlFor="fileInput">
        <ClipIcon style={{ cursor: "pointer" }} />
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => onFileChange(e)}
      />

      <Search>
        <InputField
          placeholder="Type a message"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => sendText(e)}
          value={value}
        />
      </Search>

      <Send
        onClick={() => sendMessage()}
        style={{ cursor: value && value !== "" ? "pointer" : "not-allowed" }}
      />

      <Mic />
    </Container>
  );
};

export default Footer;
