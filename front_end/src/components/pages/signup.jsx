import Header from "../fragments/header";
import Footer from "../fragments/footer";
import SignUpForm from "../fragments/signupform";
import { Flex } from "@chakra-ui/react";
const SignUp = () => {
  return (
    <Flex direction="column">
      <Header></Header>
      <SignUpForm></SignUpForm>
      <Footer></Footer>
    </Flex>
  );
};

export default SignUp
