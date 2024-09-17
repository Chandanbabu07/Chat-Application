import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserChat,
  setSelectedChat,
  setShowGroupModal,
} from "../../reduxdata/reduxstore/reduxslice";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../Config/ChatLogics";
import GroupModal from "./GroupModal";
import UserProfileModal from "./UserProfileModal";

const MyChatslist = () => {
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState();
  // const [showGroupModal, setShowGroupModal] = useState(false);
  const {
    userInfo,
    selectedChat,
    userChats,
    showGroupModal,
    showSelectedUserInfo,
  } = useSelector((state) => state.appScene);
  const toast = useToast();

  console.log("userChats", userChats);

  const getUsersChats = () => {
    dispatch(getUserChat({ token: userInfo.token })).then((result) => {
      console.log("result", result);
      if (result.meta.requestStatus === "fulfilled") {
        // toast({
        //   title: "Success!!!",
        //   description: "",
        //   status: "success",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "top-left",
        // });
      } else {
        toast({
          title: "Error occured!!!",
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      }
    });
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    if (userInfo) getUsersChats();
  }, [userInfo]);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            onClick={() => dispatch(setShowGroupModal(true))}
          >
            New Group Chat
          </Button>
        </Box>

        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="auto"
        >
          {userChats ? (
            <Stack>
              {userChats &&
                userChats.map((chat) => {
                  console.log("chat", chat === selectedChat);
                  return (
                    <Box
                      onClick={() => dispatch(setSelectedChat(chat))}
                      cursor="pointer"
                      bg={
                        selectedChat?._id === chat?._id ? "#38B2AC" : "#E8E8E8"
                      }
                      color={
                        selectedChat?._id === chat?._id ? "white" : "black"
                      }
                      px={3}
                      py={2}
                      borderRadius="lg"
                      key={chat._id}
                    >
                      <Text>
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName}
                      </Text>
                    </Box>
                  );
                })}
            </Stack>
          ) : (
            <ChatLoading></ChatLoading>
          )}
        </Box>
      </Box>

      {showGroupModal && (
        <GroupModal
        // setShowGroupModal={setShowGroupModal}
        // showGroupModal={showGroupModal}
        ></GroupModal>
      )}

      {showSelectedUserInfo && <UserProfileModal></UserProfileModal>}
    </>
  );
};

export default MyChatslist;
