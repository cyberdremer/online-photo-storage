import ModeColors from "@/components/utils/modecolors";
import { Container, Heading, Text, VStack, Button} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LogOutBlurb = () => {
  const navigate = useNavigate();
  const handleHomePageReturn = () => {
    navigate("/");
  };

  const {
    primary,
    secondary,
    secondaryText,
    primaryText,
    buttonText,
    buttonBackground,
  } = ModeColors();

  return (
    <>
      <Container flex="2" backgroundColor={secondary} minW="100%">
        <VStack
          alignItems="self-start"
          padding="1rem"
          justifyContent="space-evenly"
          minHeight="100vh"
          animationName="fade-in"
          animationDuration="slowest"
        >
          <Heading fontSize="6xl" justifySelf="normal" color={primaryText}>
            {" "}
            You are now logged out!
          </Heading>
          <Text fontSize="2xl" color={secondaryText}>
            {" "}
            If you would like to return to the hompage, click the button below!
          </Text>
          <Button onClick={handleHomePageReturn} color={buttonBackground}alignSelf="flex-start">
            <Text color={buttonText}>Homepage</Text>
          </Button>
        </VStack>
      </Container>
    </>
  );
};

export default LogOutBlurb;
