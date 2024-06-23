import { useContext, useState } from "react";
import { Dialog, styled, Box } from "@mui/material";

import { UserContext } from "../../context/UserProvider";

//components
import Menu from "./menu/Menu";
import ChatBox from "./chat/ChatBox";
import EmptyChat from "./chat/EmptyChat";

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)`
  width: 30%;
  min-width: 300px;
`;
const LeftMobileComponent = styled(Box)`
  width: 100%;
  min-width: 250px;
`;

const RightComponent = styled(Box)`
  width: 70%;
  min-width: 300px;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;
const RightMobileComponent = styled(Box)`
  width: 100%;
  min-width: 250px;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const dialogStyle = {
  height: "fit-content",
  width: "100%",
  margin: "20px",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};

const ChatDialog = () => {
  const { person } = useContext(UserContext);
  const [mobileRight, setMobileRight] = useState(false);

  return (
    <Dialog
      open={true}
      hideBackdrop={true}
      PaperProps={{ sx: dialogStyle }}
      maxWidth={"md"}
    >
      <div id="nonMobile">
        <Component>
          <LeftComponent>
            <Menu />
          </LeftComponent>
          <RightComponent>
            {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
          </RightComponent>
        </Component>
      </div>
      <div id="mobile">
        <Component>
          {!mobileRight && (
            <LeftMobileComponent>
              <Menu setMobileRight={setMobileRight} />
            </LeftMobileComponent>
          )}

          {Object.keys(person).length > 0 && mobileRight && (
            <RightMobileComponent>
              <ChatBox mobile={true} setMobileRight={setMobileRight} />
            </RightMobileComponent>
          )}
        </Component>
      </div>
    </Dialog>
  );
};

export default ChatDialog;
