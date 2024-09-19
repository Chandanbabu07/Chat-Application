// import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  // useDisclosure,
  // IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSelectedUserInfo } from "../../reduxdata/reduxstore/reduxslice";

const UserProfileModal = ({ user, children }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { userInfo, selectedChat, showSelectedUserInfo } = useSelector(
    (state) => state.appScene
  );

  console.log("selectedChat", selectedChat);

  return (
    <>
      {/* {children ? (
          <span onClick={onOpen}>{children}</span>
        ) : (
          <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
        )} */}
      <Modal
        size="lg"
        onClose={() => dispatch(setShowSelectedUserInfo(false))}
        isOpen={showSelectedUserInfo}
        isCentered
      >
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.isGroupChat
              ? selectedChat.chatName
              : selectedChat.users
                  .filter((item) => item._id !== userInfo.userInfo._id)
                  .map((user) => user.name) // Render the name of the user
                  .join(", ")}{" "}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={
                selectedChat.isGroupChat
                  ? selectedChat.chatName
                  : selectedChat.users
                      .filter((item) => item._id !== userInfo.userInfo._id)
                      .map((user) => user.pic) // Render the name of the user
                      .join(", ")
              }
              alt={
                selectedChat.isGroupChat
                  ? selectedChat.chatName
                  : selectedChat.users
                      .filter((item) => item._id !== userInfo.userInfo._id)
                      .map((user) => user.pic) // Render the name of the user
                      .join(", ")
              }
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email:{" "}
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : selectedChat.users
                    .filter((item) => item._id !== userInfo.userInfo._id)
                    .map((user) => user.email) // Render the name of the user
                    .join(", ")}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => dispatch(setShowSelectedUserInfo(false))}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfileModal;
