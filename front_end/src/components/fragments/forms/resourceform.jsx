import { Fieldset, Field, Input, Button, Portal } from "@chakra-ui/react";
import { SuccessAlert, ErrorAlert } from "../alerts/alerts";
import { useState } from "react";

const ResourceForm = ({
  successMessage,
  handleSubmission,
  success,
  error,
  errorMessage,
  name,
  title = "",
}) => {
  const [resourceName, setResourceName] = useState("");

  const handleChange = (e) => {
    const resourceName = e.target.name;
    setResourceName(resourceName);
  };

  return (
    <Fieldset.Root>
      <Portal>
        {success && <SuccessAlert message={successMessage}></SuccessAlert>}
        {error && <ErrorAlert message={errorMessage}></ErrorAlert>}
      </Portal>
      <Fieldset.Legend>{title}</Fieldset.Legend>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>{name}</Field.Label>
          <Input name="name" onChange={handleChange}></Input>
        </Field.Root>
      </Fieldset.Content>
      <Button type="submit" onClick={() => handleSubmission(e, name)}>
        Create
      </Button>
    </Fieldset.Root>
  );
};

export default ResourceForm;
