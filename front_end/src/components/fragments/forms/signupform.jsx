import { Stack, Field, Input, Button, Fieldset, Alert, Text } from "@chakra-ui/react";
import { useState } from "react";
import { formPostRequest } from "../../utils/requests";
import ModeColors from "@/components/utils/modecolors";

const SignUpForm = () => {
  const{secondary, primary, primaryText, secondaryText, buttonText, buttonBackground ,inputfieldColors} = ModeColors();
  const [createAccount, setCreateAccount] = useState({
    message: "",
    accountMade: false,
  });
  const [error, setError] = useState({
    message: "",
    errorBool: false,
  });
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
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
        `http://localhost:4000/signup`
      );
      if (response.error) {
        throw new Error(`${response.error.message}`);
      }
      setCreateAccount({
        message: response.data.message,
        accountMade: true,
      });
      setTimeout(() => {
        setCreateAccount({
          message: "",
          accountMade: false,
        });
      }, 10000);
    } catch (err) {
      setError({
        errorBool: true,
        message: err.message,
      });

      setTimeout(() => {
        setError({
          errorBool: false,
          message: "",
        });
      });
    }
  };

  return (
    <Stack gap="4" alignSelf={"center"} minW="100%" style={{paddingBottom: "2rem"}} backgroundColor={secondary}>
      {error.errorBool && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>{error.message}</Alert.Title>
        </Alert.Root>
      )}
      {createAccount.accountMade && (
        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Title>{createAccount.message}</Alert.Title>
        </Alert.Root>
      )}
      <Fieldset.Root animationName="fade-in" animationDuration="slowest" alignItems="center" paddingTop="4rem">
        <Stack gap="4" maxW="lg">
          <Fieldset.Legend fontSize="4xl" color={primaryText}>Account Details</Fieldset.Legend>
          <Fieldset.HelperText fontSize="xl" color={secondaryText}>
            Please enter your details below to create an account on Dave.Save
          </Fieldset.HelperText>
          <Stack gap="2rem">
            <Field.Root required>
              <Field.Label color={primaryText}>
                Username <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                variant="subtle"
                onChange={handleChange}
                name="username"
                backgroundColor={inputfieldColors}
              ></Input>
            </Field.Root>
            <Field.Root required>
              <Field.Label color={primaryText}>
                Email <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                variant="subtle"
                onChange={handleChange}
                name="email"
                type="email"
                backgroundColor={inputfieldColors}
              ></Input>
            </Field.Root>
            <Field.Root required>
              <Field.Label color={primaryText}>
                First Name <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                variant="subtle"
                onChange={handleChange}
                name="firstname"
                backgroundColor={inputfieldColors}
              ></Input>
            </Field.Root>
            <Field.Root required>
              <Field.Label color={primaryText}>
                Last Name <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                variant="subtle"
                onChange={handleChange}
                name="lastname"
                backgroundColor={inputfieldColors}
              ></Input>
            </Field.Root>
            <Field.Root required>
              <Field.Label color={primaryText}>
                Password <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                variant="subtle"
                onChange={handleChange}
                name="password"
                type="password"
                backgroundColor={inputfieldColors}
              ></Input>
              <Fieldset.HelperText color={secondaryText}>
                Password must be at least 8 characters long, contain an uppercase
                letter, a lowercase letter, a number, and a special character.
                
              </Fieldset.HelperText>
            </Field.Root>
            <Field.Root required>
              <Field.Label color={primaryText}>
                Confirm Password{" "}
                <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                variant="subtle"
                onChange={handleChange}
                name="confirmpassword"
                type="password"
                backgroundColor={inputfieldColors}
              ></Input>
            </Field.Root>
          </Stack>
          <Button onClick={onSubmit} size="sm" alignSelf="center" width="100%" color={buttonBackground}>
            <Text color={buttonText}>Sign Up.</Text>
          </Button>
        </Stack>
      </Fieldset.Root>
    </Stack>
  );
};

export default SignUpForm;
