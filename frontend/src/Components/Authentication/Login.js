import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../reduxdata/reduxstore/reduxslice";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleHideShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleGuest = () => {
    setEmail("Guest@connect.com");
    setPassword(123456);
  };

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Please enter required fields",
        description: "",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    dispatch(
      userLogin({
        email,
        password,
      })
    ).then((response) => {
      console.log("response", JSON.stringify(response.payload));
      localStorage.setItem("userInfo", JSON.stringify(response.payload));
      if (response.meta.requestStatus === "fulfilled") {
        setLoading(false);
        navigate("/chats");
        toast({
          title: "Login Successfull",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setLoading(false);
        toast({
          title: "Login UnSuccessful",
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email </FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password </FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></Input>

          <InputRightElement width="4.5rem">
            <Button h="1.7rem" size="sm" onClick={() => handleHideShowPass()}>
              {!showPassword ? "show" : "hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: "15px" }}
        onClick={() => handleLogin()}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: "15px" }}
        onClick={() => handleGuest()}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
