import { CloseIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const UsersBand = ({ user, onClick }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="purple"
      color="white"
      padding="4px 10px"
      borderRadius="20px"
      gap="10px"
      marginTop="20px"
      marginBottom="20px"
    >
      <Text>{user.name}</Text>
      <CloseIcon
        width="0.5em"
        height="0.5em"
        onClick={onClick}
        cursor="pointer"
      ></CloseIcon>
    </Box>
  );
};

export default UsersBand;
