import { Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import Header from "../fragments/pagefragments/header";
import Footer from "../fragments/pagefragments/footer";
import LogOutBlurb from "../fragments/pagefragments/logoutblurb";
const LogOut = () => {
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    logOut();
  }, []);

  return (
    <Flex direction="column" padding="1rem">
      <Header></Header>
      <LogOutBlurb></LogOutBlurb>
      <Footer></Footer>
    </Flex>
  );
};

export default LogOut;
