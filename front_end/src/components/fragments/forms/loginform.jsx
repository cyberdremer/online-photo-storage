import { useContext, useState } from "react";
import {
  Field,
  Fieldset,
  Input,
  Button,
  Stack,
  Alert,
  Portal,
  Text,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";
import { formPostRequest } from "../../utils/requests";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/components/context/userinfo";
import { ErrorAlert, SuccessAlert } from "../alerts/alerts";
import { useColorModeValue } from "@/components/ui/color-mode";
import ModeColors from "@/components/utils/modecolors";

const LoginForm = () => {
  const { primaryText, secondary, inputfieldColors, secondaryText, primary } =
    ModeColors();
  const { updateUserToken, updateAuthenticationStatus } =
    useContext(AuthContext);
  const { initUser, user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({
    occurred: false,
    message: "",
  });
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    setForm({ ...form, [name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await formPostRequest(
        form,
        `http://localhost:4000/login`
      );
      if (response.error) {
        throw new Error(`${response.error.message}`);
      }
      initUser(response.data.user);
      updateUserToken(response.data.token);
      updateAuthenticationStatus();
      setLoggedIn(true);
      setTimeout(() => {
        navigate(`/view-assets/folders`);
      }, 3000);
    } catch (err) {
      setError({
        occurred: true,
        message: err.message,
      });
      setTimeout(() => {
        setError({
          occurred: false,
          message: "",
        });
      }, 3000);
    }
  };

  return (
    <>
      {error.occurred && <ErrorAlert message={error.message}></ErrorAlert>}
      {loggedIn && (
        <SuccessAlert
          message={
            "You are now logged in! Redirecing you to your dave.save assets!"
          }
        ></SuccessAlert>
      )}
      <Stack
        alignSelf={"center"}
        gap="4"
        minW="100%"
        minHeight="100vh"
        paddingTop="4rem"
        backgroundColor={secondary}
      >
        <Fieldset.Root
          alignItems="center"
          animationName="fade-in"
          animationDuration="slowest"
        >
          <Stack gap="4" maxW="xl" backgroundColor={secondary}>
            <Fieldset.Legend fontSize="4xl">Login Details</Fieldset.Legend>
            <Fieldset.HelperText fontSize="xl" color={primaryText}>
              <Text color={secondaryText}>
                Please enter your details below to login to your Dave.Save
              </Text>
            </Fieldset.HelperText>
            <Stack gap="2rem">
              <Field.Root required>
                <Field.Label color={primaryText}>
                  Username <Field.RequiredIndicator></Field.RequiredIndicator>
                </Field.Label>
                <Input
                  backgroundColor={inputfieldColors}
                  variant="subtle"
                  onChange={handleChange}
                  name="username"
                ></Input>
              </Field.Root>
              <Field.Root required>
                <Field.Label color={primaryText}>
                  Password <Field.RequiredIndicator></Field.RequiredIndicator>
                </Field.Label>
                <Input
                  backgroundColor={inputfieldColors}
                  variant="subtle"
                  onChange={handleChange}
                  name="password"
                  type="password"
                ></Input>
              </Field.Root>
              <Button
                alignSelf="center"
                onClick={onSubmit}
                size="sm"
                width="100%"
              >
                Log In
              </Button>
            </Stack>
          </Stack>
        </Fieldset.Root>
      </Stack>
    </>
  );
};

export default LoginForm;
