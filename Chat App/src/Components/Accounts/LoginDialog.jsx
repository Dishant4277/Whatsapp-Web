import { Dialog, Typography, List, ListItem, Box, styled } from "@mui/material";
import qrCodeImage from "../../assets/QrCode.png";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";

let mobile = window.innerWidth <= 768 ? true : false;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const Component = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const QRCOde = styled("img")({
  margin: mobile ? "15px 10px 0 10px" : "50px 10px 0 10px",
  height: 264,
  width: 264,
});

const Container = styled(Box)`
  padding: ${mobile ? "20px 10px 0 10px" : "56px 10px 0 10px"};
`;

const Title = styled(Typography)`
  font-size: 26px;
  margin-bottom: ${mobile ? "25px" : "0"};
  color: #525252;
  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu,
    Cantarell, Fira Sans, sans-serif;
  font-weight: 300;
`;

const dialogStyle = {
  marginTop: "12%",
  height: "95%",
  width: "80%",
  maxWidth: "100",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};

const LoginDialog = () => {
  const { setAccount, setShowloginButton, setShowlogoutButton } =
    useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    const decoded = jwt_decode(res.credential);
    if (decoded.picture === undefined) {
      decoded.picture = "default";
    }
    setAccount(decoded);
    setShowloginButton(false);
    setShowlogoutButton(true);
    await addUser(decoded);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <Dialog
      open={true}
      maxWidth={"md"}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={true}
    >
      <Component>
        <Container>
          <Title>To use this WhatsApp Web Application:</Title>
          <StyledList>
            <ListItem>
              1. Click on the button below QR code to Sign In.
            </ListItem>
            <ListItem>
              2. Sign In using your Google Account and start Messaging.
            </ListItem>
            <ListItem>
              3. Scan the QR code to share the link of this app.
            </ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QRCOde src={qrCodeImage} alt="QR Code" />
          <Box
            style={{
              position: "absolute",
              top: "100%",
              transform: "translateX(45%) translateY(-25%)",
            }}
          >
            <GoogleLogin
              buttonText=""
              onSuccess={onLoginSuccess}
              onError={onLoginFailure}
            />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
