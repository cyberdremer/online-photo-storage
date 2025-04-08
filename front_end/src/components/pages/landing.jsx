import Header from "../fragments/pagefragments/header";
import Footer from "../fragments/pagefragments/footer";
import LandingBlurb from "../fragments/pagefragments/landingblurb";
import { Flex } from "@chakra-ui/react";
const Landing = () => {
  return (
    <>
      <Flex grow="1" direction="column" minHeight="100%">
        <Header></Header>
        <LandingBlurb></LandingBlurb>
        <Footer></Footer>
      </Flex>
    </>
  );
};

export default Landing;
