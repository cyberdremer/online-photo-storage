import { Fieldset, Field, Input, Button, Portal } from "@chakra-ui/react";
import { SuccessAlert, ErrorAlert } from "../alerts/alerts";

const FolderResourceForm = ({
  successMessage,
  handleSubmission,
  success,
  error,
  errorMessage,
}) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    setName(e.target.value);
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
