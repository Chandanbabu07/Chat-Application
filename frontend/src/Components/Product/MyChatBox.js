import React from "react";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import {
  setGroupModalLogic,
  setSelectedChat,
  setShowGroupModal,
  setShowSelectedUserInfo,
} from "../../reduxdata/reduxstore/reduxslice";

const MyChatBox = () => {
  const { selectedChat } = useSelector((state) => state.appScene);
  console.log("selectedChat", selectedChat);

  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(setSelectedChat(null));
  };

  const handleGroupModalLogic = () => {
    if (selectedChat && selectedChat.isGroupChat === true) {
      dispatch(setShowGroupModal(true));
      dispatch(setGroupModalLogic(true));
    } else {
      dispatch(setShowSelectedUserInfo(true));
    }
  };

  return (
    <>
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        justifyContent={selectedChat ? "" : "center"}
        flexDirection="column"
        p={3}
        bg="white"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        {selectedChat ? (
          <Box display="flex" justifyContent="space-between" width="100%">
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => handleBack()}
            />
            <Text>
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : selectedChat.users[1].name}
            </Text>
            <IconButton
              display="flex"
              icon={<ViewIcon />}
              onClick={() => handleGroupModalLogic()}
            />
          </Box>
        ) : (
          <Text fontSize="30px">Click on a user to start chatting</Text>
        )}
      </Box>
    </>
  );
};

export default MyChatBox;
