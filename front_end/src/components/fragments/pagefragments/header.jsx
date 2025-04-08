import { Flex, Link, Group } from "@chakra-ui/react";
import { ColorModeButton } from "../../ui/color-mode";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

const Header = ({}) => {
  const { authed } = useContext(AuthContext);
  return (
    <>
      <Flex direction="row" justifyContent="space-between" padding="1rem" maxHeight={"5rem"} alignItems="center">
        <Link href="/" fontSize="4xl" margin="1rem">
        &gt; &gt; dave.save
                                                          

        {/* TODO Try to find a command line font
        USE DOT MATRIX FONT */}
        {/* TODO Create inverted color of dave.save ascii art */}

        </Link>
        <Group gap="1rem">
          <ColorModeButton></ColorModeButton>
          {authed ? (
            
              <Link href="/logout">Log Out</Link>
            
          ) : (
            <>
              <Link href="/login">Log In</Link>
              <Link href="/signup">Sign Up</Link>
              <Link href="/">Home</Link>
            </>
          )}
        </Group>
      </Flex>
    </>
  );
};

export default Header;
