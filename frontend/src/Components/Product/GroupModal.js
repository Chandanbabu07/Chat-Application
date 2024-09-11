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
  fetchSearchedUsers,
  getUserChat,
  setSelectedChat,
} from "../../reduxdata/reduxstore/reduxslice";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import UsersBand from "./UsersBand";

const GroupModal = ({ setShowGroupModal, showGroupModal }) => {
  const handleClose = () => setShowGroupModal(false);
  const [groupName, setGroupName] = useState("");
  const [searchUsers, setSearchedUsers] = useState();
  const [addUsers, setAddUsers] = useState([]);
  const [addUserInfo, setAddUsersInfo] = useState([]);

  const { userInfo, searchedUsers } = useSelector((state) => state.appScene);

  console.log("addUsers", addUsers);

  const toast = useToast();
  const dispatch = useDispatch();

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
    if (addUserInfo && addUserInfo?.includes(user._id)) {
      toast({
        title: "User Already Exist",
        description: "",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else {
      setAddUsers([...addUsers, user._id]);
      setAddUsersInfo([...addUserInfo, user]);
    }
  };

  const handleDelete = (userId) => {
    const updatedUserArr = addUserInfo.filter((item) => item._id !== userId);
    setAddUsersInfo(updatedUserArr);
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

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={showGroupModal} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton onClose={handleClose} />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

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

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => handleCreateGroupChat()}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
