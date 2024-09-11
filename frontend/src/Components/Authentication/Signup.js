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
import { userRegistration } from "../../reduxdata/reduxstore/reduxslice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleHideShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleHideShowConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const converImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result); // Set the base64 string URL
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!name || !email || !password || !confirmPassword) {
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
    console.log(
      "Save",
      name,
      email,
      password,
      confirmPassword,
      image,
      imageUrl
    );

    dispatch(
      userRegistration({
        name,
        email,
        password,
        confirmPassword,
      })
    ).then((response) => {
      console.log("response", JSON.stringify(response.payload));
      localStorage.setItem("userInfo", JSON.stringify(response.payload));
      if (response.meta.requestStatus === "fulfilled") {
        setLoading(false);
        navigate("/chats");
        toast({
          title: "Registration Successfull",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setLoading(false);
        toast({
          title: "Registration UnSuccessful",
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name </FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email </FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password </FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>

          <InputRightElement width="4.5rem">
            <Button h="1.7rem" size="sm" onClick={() => handleHideShowPass()}>
              {!showPassword ? "show" : "hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password </FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>

          <InputRightElement width="4.5rem">
            <Button
              h="1.7rem"
              size="sm"
              onClick={() => handleHideShowConfirmPass()}
            >
              {!showConfirmPassword ? "show" : "hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="picture">
        <FormLabel>Picture </FormLabel>
        <Input
          placeholder="Upload Picture"
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => converImage(e)}
        ></Input>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: "15px" }}
        onClick={() => handleSubmit()}
        isLoading={loading}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default Signup;
