import Header from "../fragments/pagefragments/header";
import Footer from "../fragments/pagefragments/footer";
import LoginForm from "../fragments/forms/loginform";
import { Flex } from "@chakra-ui/react";
const Login = () => {
  return (
    <Flex direction="column" >
      <Header></Header>
      <LoginForm></LoginForm>
      <Footer></Footer>
    </Flex>
  );
};

export default Login;
