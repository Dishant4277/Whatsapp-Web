import { useState, useEffect, useContext } from "react";
import { Box, styled, Divider } from "@mui/material";
import { AccountContext } from "../../../context/AccountProvider";

//components
import Conversation from "./Conversation";
import { getUsers } from "../../../service/api";
import Loader from "../../loader/Loader";

const Component = styled(Box)`
  overflow: overlay;
  height: 81vh;
`;

const StyledDivider = styled(Divider)`
  margin: 0;
  background-color: #e9edef;
  opacity: 0.6;
`;

const Conversations = ({ text, setMobileRight }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data = await getUsers();
      let fiteredData = data.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(fiteredData);
      setLoading(false);
    };
    fetchData();
  }, [text]);

  useEffect(() => {
    socket.current.emit("addUser", account);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [account]);

  return (
    <Component>
      {users?.length > 0 ? (
        users?.map(
          (user, index) =>
            user.sub !== account.sub && (
              <div key={index}>
                <Conversation user={user} setMobileRight={setMobileRight} />
                <StyledDivider />
              </div>
            )
        )
      ) : (
        <div style={{ padding: 20 }}>
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
          ) : text?.length > 0 ? (
            "No users found with '" + text + "' in their name"
          ) : (
            "No conversations"
          )}
        </div>
      )}
    </Component>
  );
};

export default Conversations;
