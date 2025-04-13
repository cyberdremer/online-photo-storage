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
  Text,
  Highlight
} from "@chakra-ui/react";
import { BsFolder2Open } from "react-icons/bs";

import { FaFolderOpen } from "react-icons/fa";

const AssetDisplay = ({ children, loading, error, items }) => {
  if (loading) {
    return (
      <Stack alignSelf="center" flex="1" animationName="pulse" animationDuration="slowest">
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
    <Stack alignSelf="center" flex="1">
      <Alert.Root status="error" variant="subtle">
        <Alert.Indicator />
        <Alert.Title>An error has occurred!</Alert.Title>
      </Alert.Root>
    </Stack>;
  }

  if (items && items.files.length === 0 && items.folders.length === 0) {
    return (
      <Stack alignSelf="center" padding="1rem" animationName="fade-in" animationDuration="slowest" flex="1">
        <Icon alignSelf="center">
          <BsFolder2Open size="10rem"></BsFolder2Open>
        </Icon>
        
          <Text fontSize="xl" lineClamp="4">
            <Highlight query={["no", "creating", "uploading"]} styles={{fontWeight:"semibold"}}>
            There are no assets here! :( You can make it less lonely here by uploading a
            file or creating a folder!
            </Highlight>
            
          </Text>
        
      </Stack>
    );
  }

  return <Container flex="1">{children}</Container>;
};

export default AssetDisplay;
