import { Text, Link, List, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container minW="100%" maxW="100%" padding="0" margin="0">
      <footer
        style={{
          top: "100vh",
          minWidth: "100%",
          minHeight:"2.5rem",
          backgroundColor: "#2D3748",
          color: "white",
        }}
      >
        <Text textAlign="center" padding={"0.5rem"}>
          &copy; <Link href="https://github.com/cyberdremer">Cyberdremer</Link>
        </Text>
      </footer>
    </Container>
  );
};

export default Footer;
