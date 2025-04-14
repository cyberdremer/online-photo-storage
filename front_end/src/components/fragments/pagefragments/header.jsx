import { Flex, Link, Group, Icon } from "@chakra-ui/react";
import { BiLogOut, BiLogIn, BiPlus, BiHome } from "react-icons/bi";
import { ColorModeButton } from "../../ui/color-mode";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useColorModeValue } from "../../ui/color-mode";
import ModeColors from "@/components/utils/modecolors";

const Header = ({}) => {
  const { authed } = useContext(AuthContext);

  const {primary, primaryText} = ModeColors();

  
  return (
    <>
      <Flex
        direction="row"
        justifyContent="space-between"
        padding="1rem"
        maxHeight={"5rem"}
        alignItems="center"
        backgroundColor={primary}

      >
        <Link href="/" fontSize="4xl" margin="1rem" animationName="slide-from-left-full" animationDuration="slowest" color={primaryText}>
          &gt; &gt; dave.save
        </Link>
        <Group animationName="slide-from-left-full" animationDuration="slowest" gap="1rem">
          <ColorModeButton></ColorModeButton>
          {authed ? (
            <>
              <Group>
                <BiLogOut></BiLogOut>
                <Link href="/logout" color={primaryText}>Log Out</Link>
              </Group>
            </>
          ) : (
            <>
              <Group>
                <Icon>
                  <BiLogIn></BiLogIn>
                </Icon>
                <Link href="/login" color={primaryText}>Log In</Link>
              </Group>
              <Group>
                <BiPlus></BiPlus>
                <Link href="/signup" color={primaryText}>Sign Up</Link>
              </Group>
              <Group>
                <BiHome></BiHome>
                <Link href="/" color={primaryText}>Home</Link>
              </Group>
            </>
          )}
        </Group>
      </Flex>
    </>
  );
};

export default Header;
