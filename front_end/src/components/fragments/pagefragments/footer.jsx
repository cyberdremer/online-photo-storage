import { Text, Link, List, Container } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const Footer = () => {
  const primary = useColorModeValue("light.primary", "dark.primary");
  const secondaryText = useColorModeValue(
      "light.secondarytext",
      "dark.secondarytext"
    );
  return (
    <Container
      minW="100%"
      maxW="100%"
      padding="0"
      margin="0"
      animationName="slide-from-left-full"
      animationDuration="slowest"
      backgroundColor={primary}
    >
      <footer
        style={{
          minWidth: "100%",
          minHeight: "2.5rem",
          
        }}
      >
        <Text textAlign="center" padding={"0.5rem"} color={secondaryText}>
          &copy; <Link href="https://github.com/cyberdremer">Cyberdremer</Link>
        </Text>
      </footer>
    </Container>
  );
};

export default Footer;
