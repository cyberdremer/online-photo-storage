import {
  Grid,
  Portal,
  Stack,
  SimpleGrid,
  Spinner,
  Alert,
  Container,
  ProgressCircle,
} from "@chakra-ui/react";
import FoldersAndFiles from "../effects/fetchFoldersAndFiles";
import File from "../fragments/pagefragments/file";
import Folder from "../fragments/pagefragments/folder";

const AssetDisplay = ({ children, loading, error }) => {
  if (loading) {
    return (
      <Stack alignSelf="center">
        <ProgressCircle.Root value={null} size="xl">
          <ProgressCircle.Circle>
            <ProgressCircle.Track></ProgressCircle.Track>
            <ProgressCircle.Range></ProgressCircle.Range>
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </Stack>
    );
  }

  if (error) {
    <Stack alignSelf="center">
      <Alert.Root status="error" variant="subtle">
        <Alert.Indicator />
        <Alert.Title>An error has occurred!</Alert.Title>
      </Alert.Root>
    </Stack>;
  }

  return (
    <Container>
      <SimpleGrid columns="6" gap="1rem">
        {children}
      </SimpleGrid>
    </Container>
  );
};

export default AssetDisplay;
