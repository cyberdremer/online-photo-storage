import {
  Grid,
  Portal,
  Stack,
  SimpleGrid,
  Spinner,
  Alert,
  Container,
  ProgressCircle,
  VStack,
  Icon,
} from "@chakra-ui/react";

import { FaFolderOpen } from "react-icons/fa";

const AssetDisplay = ({ children, loading, error, items }) => {
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

  if (items) {
    if (items.files.length === 0 && items.folders.length === 0) {
      return (
        <VStack>
          <Icon>
            <FaFolderOpen></FaFolderOpen>
          </Icon>
          <Text>
            There are no assets in this folder! Upload some or create a folder
            here, it's very lonely here : (
          </Text>
        </VStack>
      );
    } else {
      return (
        <Container>
          <SimpleGrid columns="4" gap="1rem">
            {children}
          </SimpleGrid>
        </Container>
      );
    }
  }

  // return (
  //   <Container>
  //     <SimpleGrid columns="4" gap="1rem">
  //       {children}
  //     </SimpleGrid>
  //   </Container>
  // );
};

export default AssetDisplay;
