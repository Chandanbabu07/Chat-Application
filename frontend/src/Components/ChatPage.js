import React from "react";
import SideDrawer from "./Product/SideDrawer";
import MyChatslist from "./Product/MyChatslist";
import MyChatBox from "./Product/MyChatBox";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const { userInfo } = useSelector((state) => state.appScene);

  return (
    <div style={{ width: "100%" }}>
      <SideDrawer></SideDrawer>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        h="91.5vh"
        p="10px"
      >
        <MyChatslist></MyChatslist>
        <MyChatBox></MyChatBox>
      </Box>
    </div>
  );
};

export default ChatPage;
