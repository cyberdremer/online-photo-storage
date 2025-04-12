import { Flex, Link, Group, Icon } from "@chakra-ui/react";
import { BiLogOut, BiLogIn, BiPlus, BiHome } from "react-icons/bi";
import { ColorModeButton } from "../../ui/color-mode";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

const Header = ({}) => {
  const { authed } = useContext(AuthContext);
  return (
    <>
      <Flex
        direction="row"
        justifyContent="space-between"
        padding="1rem"
        maxHeight={"5rem"}
        alignItems="center"
      >
        <Link href="/" fontSize="4xl" margin="1rem">
          &gt; &gt; dave.save
        </Link>
        <Group gap="1rem">
          <ColorModeButton></ColorModeButton>
          {authed ? (
            <>
              <Group>
                <BiLogOut></BiLogOut>
                <Link href="/logout">Log Out</Link>
              </Group>
            </>
          ) : (
            <>
              <Group>
                <Icon>
                  <BiLogIn></BiLogIn>
                </Icon>
                <Link href="/login">Log In</Link>
              </Group>
              <Group>
                <BiPlus></BiPlus>
                <Link href="/signup">Sign Up</Link>
              </Group>
              <Group>
                <BiHome></BiHome>
                <Link href="/">Home</Link>
              </Group>
            </>
          )}
        </Group>
      </Flex>
    </>
  );
};

export default Header;
