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
  Text
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

  if (items && items.files.length === 0 && items.folders.length === 0) {
    return (
      <Stack alignSelf="center" padding="1rem" animationName="fade-in" animationDuration="slowest">
        <Icon alignSelf="center">
          <FaFolderOpen size="10rem"></FaFolderOpen>
        </Icon>
        <Text fontSize="l" lineClamp="4">
          There are no assets here! You can make it less lonely by uploading a
          file or creating a folder!
        </Text>
      </Stack>
    );
  }

  return <Container>{children}</Container>;
};

export default AssetDisplay;
