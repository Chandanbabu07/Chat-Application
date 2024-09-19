import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import {
  createGroupChat,
  fetchAllMessages,
  fetchSearchedUsers,
  getUserChat,
  removeUserFromGroup,
  setGroupModalLogic,
  setSelectedChat,
  setShowGroupModal,
  updateGroupName,
  updateGroupUsers,
} from "../../reduxdata/reduxstore/reduxslice";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import UsersBand from "./UsersBand";

const GroupModal = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setGroupModalLogic(false));
    dispatch(setShowGroupModal(false));
  };
  const [groupName, setGroupName] = useState("");
  const [searchUsers, setSearchedUsers] = useState();
  const [addUsers, setAddUsers] = useState([]);
  const [addUserInfo, setAddUsersInfo] = useState([]);

  const {
    userInfo,
    searchedUsers,
    selectedChat,
    showGroupModal,
    groupModalLogic,
  } = useSelector((state) => state.appScene);

  console.log("addUsers", addUsers);
  console.log("userInfo", userInfo.userInfo._id);

  const toast = useToast();

  const handleDebounce = useDebounce({ val: searchUsers, delay: 400 });

  const handleSearch = (val) => {
    setSearchedUsers(val);
    // if (!searchUsers) {
    //   toast({
    //     title: "Please do valid Search",
    //     description: "",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   return;
    // }
  };

  useEffect(() => {
    if (handleDebounce) {
      dispatch(
        fetchSearchedUsers({ search: searchUsers, token: userInfo.token })
      );
    }
  }, [handleDebounce]);

  const selectUser = (user) => {
    console.log("user", user);
    if (addUserInfo && addUserInfo?.includes(user)) {
      toast({
        title: "User Already Exist",
        description: "",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else {
      if (groupModalLogic) {
        if (selectedChat && selectedChat?.users?.includes(user)) {
          toast({
            title: "User Already Exist",
            description: "",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          return;
        } else {
          dispatch(
            setSelectedChat({
              ...selectedChat, // Spread the existing properties of selectedChat
              users: [...selectedChat.users, user], // Update the users array
            })
          );

          dispatch(
            updateGroupUsers({
              chatId: selectedChat._id,
              userId: user._id,
              token: userInfo.token,
            })
          );
        }
      } else {
        setAddUsers([...addUsers, user._id]);
        setAddUsersInfo([...addUserInfo, user]);
      }
    }
  };

  const handleDelete = (userId, chatId) => {
    const updatedUserArr = addUserInfo.filter((item) => item._id !== userId);
    setAddUsersInfo(updatedUserArr);

    if (chatId && userId) {
      if (selectedChat.groupAdmin._id !== userInfo.userInfo._id) {
        toast({
          title: "Only Admin can remove users",
          description: "",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      } else {
        dispatch(
          removeUserFromGroup({
            chatId: chatId,
            userId: userId,
            token: userInfo.token,
          })
        ).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            console.log("Result", result.payload);
            dispatch(setSelectedChat(result.payload));
            dispatch(getUserChat({ token: userInfo.token }));
            fetchAllMessages({
              chatId: selectedChat._id,
              token: userInfo.token,
            });
          }
        });
      }
    }
  };

  const handleCreateGroupChat = () => {
    if (!groupName || !addUsers) {
      toast({
        title: "Please add required filed",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    dispatch(
      createGroupChat({
        name: groupName,
        users: JSON.stringify(addUsers),
        token: userInfo.token,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log("Result", result.payload);
        dispatch(setSelectedChat(result.payload));
        dispatch(getUserChat({ token: userInfo.token }));
        handleClose();
      }
    });
  };

  const handleUpdate = (Id) => {
    if (groupName) {
      dispatch(
        updateGroupName({
          chatId: Id,
          updatedGroupName: groupName,
          token: userInfo.token,
        })
      ).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          console.log("Result", result.payload);
          dispatch(setSelectedChat(result.payload));
          dispatch(getUserChat({ token: userInfo.token }));
        }
      });
    }
  };

  const handleLeavegroup = (userId, chatId) => {
    console.log("123w", chatId, userId);
    if (chatId && userId) {
      dispatch(
        removeUserFromGroup({
          chatId: chatId,
          userId: userId,
          token: userInfo.token,
        })
      ).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          console.log("Result", result.payload);
          dispatch(setSelectedChat(result.payload));
          dispatch(getUserChat({ token: userInfo.token }));
          fetchAllMessages({ chatId: selectedChat._id, token: userInfo.token });
          handleClose();
        }
      });
    }
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={showGroupModal} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          {selectedChat && groupModalLogic ? (
            <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center"
            >
              {selectedChat.chatName}
            </ModalHeader>
          ) : (
            <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center"
            >
              Create Group Chat
            </ModalHeader>
          )}
          <ModalCloseButton onClose={handleClose} />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl display="flex" gap="10px">
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupName(e.target.value)}
              />

              {selectedChat && groupModalLogic && (
                <Button
                  colorScheme="green"
                  onClick={() => handleUpdate(selectedChat._id)}
                >
                  Update
                </Button>
              )}
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {groupModalLogic ? (
              <Box
                display="flex"
                gap="10px"
                alignItems="flex-start"
                justifyContent="flex-start"
                flexWrap="wrap"
              >
                {selectedChat &&
                  selectedChat.users.map((item, index) => {
                    console.log("item", item);
                    return (
                      <UsersBand
                        key={item._id}
                        user={item}
                        onClick={() => handleDelete(item._id, selectedChat._id)}
                      ></UsersBand>
                    );
                  })}
              </Box>
            ) : (
              <Box
                display="flex"
                gap="10px"
                alignItems="flex-start"
                justifyContent="flex-start"
                flexWrap="wrap"
              >
                {addUserInfo &&
                  addUserInfo.map((item) => {
                    return (
                      <UsersBand
                        key={item._id}
                        user={item}
                        onClick={() => handleDelete(item._id)}
                      ></UsersBand>
                    );
                  })}
              </Box>
            )}

            {searchedUsers &&
              searchedUsers.map((item, index) => {
                return (
                  <UserListItem
                    key={item._id}
                    user={item}
                    handleFunction={() => selectUser(item)}
                  ></UserListItem>
                );
              })}
          </ModalBody>

          <ModalFooter display="flex" gap="10px">
            {selectedChat && groupModalLogic ? (
              <>
                <Button
                  colorScheme="red"
                  onClick={() =>
                    handleLeavegroup(userInfo.userInfo._id, selectedChat._id)
                  }
                >
                  Leave Group
                </Button>
              </>
            ) : (
              <Button
                colorScheme="blue"
                onClick={() => handleCreateGroupChat()}
              >
                Create Chat
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
