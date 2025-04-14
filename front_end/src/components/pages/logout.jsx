import { Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { UserContext } from "../context/userinfo";
import Header from "../fragments/pagefragments/header";
import Footer from "../fragments/pagefragments/footer";
import LogOutBlurb from "../fragments/pagefragments/logoutblurb";
const LogOut = () => {
  const { logOut } = useContext(AuthContext);
  const { removeUser } = useContext(UserContext);

  useEffect(() => {
    const finalizeLogOut = () => {
      logOut();
      removeUser();
    };

    finalizeLogOut();
  }, []);

  return (
    <Flex direction="column" minHeight="100vh">
      <Header></Header>
      <LogOutBlurb></LogOutBlurb>
      <Footer></Footer>
    </Flex>
  );
};

export default LogOut;
