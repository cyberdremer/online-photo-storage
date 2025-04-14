import {
  Button,
  Text,
  Highlight,
  Flex,
  Heading,
  List,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import ModeColors from "@/components/utils/modecolors";
const LandingBlurb = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/signup");
  };

  const { secondary, primaryText, secondaryText, buttonText, buttonBackground, accent } =
    ModeColors();

  return (
    <Flex
      direction="column"
      gap="3rem"
      grow="3"
      paddingTop="2rem"
      paddingBottom="2rem"
      flex="2"
      animationName="fade-in"
      animationDuration="slowest"
      backgroundColor={secondary}
    >
      <Container alignSelf={"center"} gap="1rem">
        <section>
          <Heading size="5xl" color={primaryText}>
            &gt; &gt;Secure.Fast.Reliable
          </Heading>
          <Text textStyle="xl" color={primaryText}>
            <Highlight query="Upload, share, and manage" color={accent}>
              Upload, share, and manage your files with Dave.Save. Wether you're
              looking to store files or collaborate with your team, Dave.Save
              has got you covered!
            </Highlight>
          </Text>
        </section>
      </Container>

      <Container>
        <section>
          <Heading size="5xl" color={primaryText}>
            &gt; &gt;Why Dave.Save?
          </Heading>
          <List.Root padding={"1rem"}>
            <List.Item>
              <Text textStyle="xl" color={secondaryText}>
                <Highlight query="Speedy Uploads">
                  Speedy Uploads: Enjoy fast uploads with no hassle!
                </Highlight>
              </Text>
            </List.Item>
            <List.Item>
              <Text textStyle="xl" color={secondaryText}>
                <Highlight query="Enhanced Security">
                  Enhanced Security: Your files are protected with topnotch
                  security
                </Highlight>
              </Text>
            </List.Item>
            <List.Item>
              <Text textStyle="xl" color={secondaryText}>
                <Highlight query="User-Friendly Interface">
                  User-Friendly Interface: A simple and intuitive design for a
                  seamless experience
                </Highlight>
              </Text>
            </List.Item>
          </List.Root>
        </section>
      </Container>
      <Container gap="1rem">
        <section>
          <Heading size="5xl" color={primaryText}>
            &gt; &gt;Get Started Today!
          </Heading>
          <Text textStyle="xl" color={secondaryText}>
            Click the button below to begin your journey with Dave.Save
          </Text>
          <Button size="lg" color={buttonBackground} onClick={handleGetStarted}>
            <Text color={buttonText}>Sign Up!</Text>
          </Button>
        </section>
      </Container>
    </Flex>
  );
};

export default LandingBlurb;
