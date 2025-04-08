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
        <VStack alignItems="self-start">
          <Heading> You are now logged out!</Heading>
          <Text>
            {" "}
            If you would like to return to the hompage, click the button below!
          </Text>
          <Button onClick={handleHomePageReturn}>Homepage</Button>
        </VStack>
      </Container>
    </>
  );
};

export default LogOutBlurb;
