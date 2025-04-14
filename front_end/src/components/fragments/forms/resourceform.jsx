import { Fieldset, Field, Input, Button, Portal, Text } from "@chakra-ui/react";
import { SuccessAlert, ErrorAlert } from "../alerts/alerts";
import { useState } from "react";
import ModeColors from "@/components/utils/modecolors";

const ResourceForm = ({
  successMessage,
  handleSubmission,
  success,
  error,
  errorMessage,
  name,
  title = "",
}) => {
  const [resourceName, setResourceName] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const input = e.target.value;
    setResourceName({ ...resourceName, name: input });
  };

  const {
    primary,
    secondary,
    primaryText,
    secondaryText,
    inputfieldColors,
    buttonText,
    buttonBackground,
  } = ModeColors();

  return (
    <Fieldset.Root>
      <Portal>
        {success && <SuccessAlert message={successMessage}></SuccessAlert>}
        {error && <ErrorAlert message={errorMessage}></ErrorAlert>}
      </Portal>
      <Fieldset.Legend color={primaryText}>{title}</Fieldset.Legend>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label color={primaryText}>{name}</Field.Label>
          <Input
            name="name"
            onChange={handleChange}
            backgroundColor={inputfieldColors}
          ></Input>
        </Field.Root>
      </Fieldset.Content>
      <Button
        type="submit"
        color={buttonBackground}
        onClick={() => handleSubmission(resourceName)}
      >
        <Text color={buttonText}>Create</Text>
      </Button>
    </Fieldset.Root>
  );
};

export default ResourceForm;
