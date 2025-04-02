import Header from "../fragments/header";
import Footer from "../fragments/footer";
import LoginForm from "../fragments/loginform";
import { Flex } from "@chakra-ui/react";
const Login = () => {
  return (
    <Flex direction="column">
      <Header></Header>
      <LoginForm></LoginForm>
      <Footer></Footer>
    </Flex>
  );
};

export default Login;
