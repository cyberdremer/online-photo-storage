import { Container, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LogOutBlurb = () => {
  const navigate = useNavigate();
  const handleHomePageReturn = () => {
    navigate("/");
  };

  return (
    <>
      <Container flex="2">
        <VStack
          alignItems="self-start"
          padding="1rem"
          justifyContent="space-evenly"
          minHeight="100vh"
          animationName="fade-in"
          animationDuration="slowest"
        >
          <Heading fontSize="6xl" justifySelf="normal"> You are now logged out!</Heading>
          <Text fontSize="2xl">
            {" "}
            If you would like to return to the hompage, click the button below!
          </Text>
          <Button onClick={handleHomePageReturn} alignSelf="flex-start">
            Homepage
          </Button>
        </VStack>
      </Container>
    </>
  );
};

export default LogOutBlurb;
