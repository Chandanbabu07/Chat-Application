import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModel";
import {
  accessChats,
  fetchSearchedUsers,
  getUserChat,
  setSelectedChat,
  setUserChats,
} from "../../reduxdata/reduxstore/reduxslice";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.appScene);
  const [showProfileModle, setShowProfileModle] = useState(false);
  const [search, setSearch] = useState();
  const [isloading, setIsloading] = useState(false);
  const [isChatloading, setIsChatloading] = useState(false);

  const { searchedUsers, userChats, selectedChat } = useSelector(
    (state) => state.appScene
  );

  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  const handleSearch = () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        description: "",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    setIsloading(true);
    dispatch(
      fetchSearchedUsers({ search: search, token: userInfo.token })
    ).then((result) => {
      console.log("result", result);
      if (result.meta.requestStatus === "fulfilled") {
        setIsloading(false);
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

  const accessChat = (userId) => {
    setIsChatloading(true);
    dispatch(accessChats({ userId: userId, token: userInfo.token })).then(
      (result) => {
        console.log("result", result);
        if (result.meta.requestStatus === "fulfilled") {
          // if (!userChats.find((c) => c._id === selectedChat._id)) {
          //   setUserChats([result, ...userChats]);
          // }
          // dispatch(setSelectedChat(result.payload));
          dispatch(getUserChat({ token: userInfo.token }));
          setIsChatloading(false);
          onClose();
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
      }
    );
  };
  console.log("searchedUsers", searchedUsers);
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Roboto">
          XConnext
        </Text>

        <div>
          <Menu>
            <MenuButton p="1">
              <BellIcon fontSize="2lx" m="1"></BellIcon>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon></ChevronDownIcon>}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={userInfo ? userInfo?.name : ""}
                src={userInfo ? userInfo.pic : ""}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setShowProfileModle(true)}>
                My Profile
              </MenuItem>
              <MenuDivider></MenuDivider>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              <Box display="flex" pb={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                ></Input>
                <Button onClick={() => handleSearch()}>Go</Button>
              </Box>
              {isloading ? (
                <ChatLoading></ChatLoading>
              ) : (
                searchedUsers.map((item, index) => {
                  return (
                    <UserListItem
                      key={item._id}
                      user={item}
                      handleFunction={() => accessChat(item._id)}
                    ></UserListItem>
                  );
                })
              )}

              {isChatloading && <Spinner ml="auto" display="flex"></Spinner>}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {showProfileModle && (
        <ProfileModal
          showProfileModle={showProfileModle}
          setShowProfileModle={setShowProfileModle}
        ></ProfileModal>
      )}
    </>
  );
};

export default SideDrawer;
