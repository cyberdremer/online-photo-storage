import Header from "../fragments/pagefragments/header";
import Footer from "../fragments/pagefragments/footer";
import SignUpForm from "../fragments/forms/signupform";
import { Flex } from "@chakra-ui/react";
const SignUp = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header></Header>
      <SignUpForm></SignUpForm>
      <Footer></Footer>
    </Flex>
  );
};

export default SignUp
