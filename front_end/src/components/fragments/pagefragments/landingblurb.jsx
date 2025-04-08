import { Button, Text, Highlight, Flex, Heading, List, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const LandingBlurb = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };
  return (
    <Flex direction="column" gap="3rem" grow="2" margin="2rem" marginBottom="2.5rem" flex="2">
      <Container alignSelf={"center"} gap="1rem">
        <section>
          <Heading size="5xl">&gt; &gt;Secure.Fast.Reliable</Heading>
          <Text textStyle="xl">
            <Highlight query="Upload, share, and manage">
              Upload, share, and manage your files with Dave.Save. Wether you're
              looking to store files or collaborate with your team, Dave.Save has
              got you covered!
            </Highlight>
          </Text>
        </section>
      </Container>

      <Container>
        <section>
          <Heading size="5xl">&gt; &gt;Why Dave.Save?</Heading>
          <List.Root padding={"1rem"}>
            <List.Item>
              <Text textStyle="xl">
                <Highlight query="Speedy Uploads">
                  Speedy Uploads: Enjoy fast uploads with no hassle!
                </Highlight>
              </Text>
            </List.Item>
            <List.Item>
              <Text textStyle="xl">
                <Highlight query="Enhanced Security">
                  Enhanced Security: Your files are protected with topnotch
                  security
                </Highlight>
              </Text>
            </List.Item>
            <List.Item>
              <Text textStyle="xl">
                <Highlight query="User-Friendly Interface">
                  User-Friendly Interface: A simple and intuitive design for a
                  seamless experience
                </Highlight>
              </Text>
            </List.Item>
          </List.Root>
        </section>
      </Container>
      <Container gap= "1rem">
        <section >
          <Heading size="5xl">&gt; &gt;Get Started Today!</Heading>
          <Text textStyle="xl">Click the button below to begin your journey with Dave.Save</Text>
          <Button size="lg" onClick={handleGetStarted}>Get Started</Button>
        </section>
      </Container> 
    </Flex>
  );
};

export default LandingBlurb;
