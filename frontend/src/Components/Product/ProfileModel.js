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
import { useSelector } from "react-redux";

const ProfileModal = ({
  user,
  children,
  showProfileModle,
  setShowProfileModle,
}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const { userInfo } = useSelector((state) => state.appScene);

  console.log("ProfileModal", userInfo && userInfo);

  return (
    <>
      {/* {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )} */}
      <Modal
        size="lg"
        onClose={() => setShowProfileModle(false)}
        isOpen={showProfileModle}
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
            {userInfo && userInfo?.name}
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
              src={userInfo && userInfo?.pic}
              alt={userInfo && userInfo?.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {userInfo && userInfo?.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowProfileModle(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
