import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import {
  fetchAllMessages,
  getUserChat,
  sendMessage,
  setGroupModalLogic,
  setSelectedChat,
  setShowGroupModal,
  setShowSelectedUserInfo,
} from "../../reduxdata/reduxstore/reduxslice";
import UsersMessagesBlock from "./UsersMessagesBlock";

const MyChatBox = () => {
  const { selectedChat, userInfo, messageLoading } = useSelector(
    (state) => state.appScene
  );
  const [newMessage, setNewMessage] = useState();
  const [chatAllMessages, setChatAllMessages] = useState(null);
  // const [isloading, setIsLoading] = useState(false);
  console.log("chatAllMessages", chatAllMessages);

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

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = (event) => {
    if (event.key === "Enter" || (event.type === "click" && newMessage)) {
      try {
        dispatch(
          sendMessage({
            chatId: selectedChat._id,
            content: newMessage,
            token: userInfo.token,
          })
        ).then((result) => {
          console.log("result", result);
          if (result.meta.requestStatus === "fulfilled") {
            setNewMessage("");

            dispatch(
              fetchAllMessages({
                chatId: selectedChat._id,
                token: userInfo.token,
              })
            ).then((result) => {
              console.log("setChatAllMessages", result.payload);
              setChatAllMessages(result.payload);
            });

            dispatch(getUserChat({ token: userInfo.token }));
          }
        });
      } catch (error) {
        console.error("Error fetching chat data:", error);
        throw error;
      }
    }
  };

  useEffect(() => {
    if (selectedChat) {
      console.log("selectedChat", selectedChat);
      dispatch(
        fetchAllMessages({ chatId: selectedChat._id, token: userInfo.token })
      ).then((result) => {
        console.log("setChatAllMessages", result.payload);
        setChatAllMessages(result.payload);
      });
    }
  }, [selectedChat]);

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
          <>
            <Box display="flex" justifyContent="space-between" width="100%">
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => handleBack()}
              />
              <Text>
                {selectedChat.isGroupChat
                  ? selectedChat.chatName
                  : selectedChat.users
                      .filter((item) => item._id !== userInfo.userInfo._id)
                      .map((user) => user.name) // Render the name of the user
                      .join(", ")}{" "}
                {/* Join the names with a comma */}
              </Text>
              <IconButton
                display="flex"
                icon={<ViewIcon />}
                onClick={() => handleGroupModalLogic()}
              />
            </Box>

            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="#E8E8E8"
              w="100%"
              h="100%"
              borderRadius="lg"
              overflowY="hidden"
            >
              {messageLoading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              ) : (
                <UsersMessagesBlock
                  messages={chatAllMessages}
                ></UsersMessagesBlock>
              )}
              <FormControl
                onKeyDown={(e) => handleSendMessage(e)}
                id="first-name"
                isRequired
                mt={3}
                display="flex"
                gap="10px"
              >
                {/* {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )} */}
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={(e) => typingHandler(e)}
                />
                <Button
                  colorScheme="green"
                  onClick={(e) => handleSendMessage(e)}
                >
                  Send
                </Button>
              </FormControl>
            </Box>
          </>
        ) : (
          <Text fontSize="30px">Click on a user to start chatting</Text>
        )}
      </Box>
    </>
  );
};

export default MyChatBox;
