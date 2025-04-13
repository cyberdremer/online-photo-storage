import {
  GridItem,
  Stack,
  FormatByte,
  IconButton,
  Menu,
  Portal,
  Button,
  Box,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { FaFile } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef, useState } from "react";
import { DeleteAlert } from "../alerts/alerts";
import truncateString from "@/components/utils/stringformatter";
const File = ({
  name,
  createdat,
  size,
  updatedat,
  handleDelete,
  handleDownload,
  handleRename,
  id,
  folderid
}) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const displayFileExtraInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <GridItem id={id}>
      <Box maxW="sm" borderWidth="1px" minH="6rem" animationName="fade-in" animationDuration="slowest">
        <Box p="4" spaceY="2">
          <HStack>
            <VStack alignItems="flex-start" textStyle="sm">
              <FaFile size="5rem"></FaFile>
              <Text>{truncateString(name, 18)}</Text>
              <Text>
                Size: <FormatByte value={size}></FormatByte>
              </Text>
              {infoVisible && (
                <>
                  <Text>Created At: {createdat}</Text>

                  <Text>Updated At: {updatedat}</Text>
                </>
              )}
            </VStack>
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton>
                  <BsThreeDotsVertical></BsThreeDotsVertical>
                </IconButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      value="delete-file"
                      onClick={(e) => handleDelete(e)}
                      id={id}
                    >
                      Delete File
                    </Menu.Item>

                    <Menu.Item
                      value="update-file"
                      onClick={(e) => handleRename(e)}
                      id={ id}
                    >
                      Update File Name
                    </Menu.Item>
                    <Menu.Item
                      value="download-file"
                      onClick={(e) => handleDownload(e)}
                      id={ id}
                    >
                      Download File
                    </Menu.Item>
                    <Menu.Item
                      value="display-file-infop"
                      onClick={displayFileExtraInfo}
                    >
                      {infoVisible ? "Hide File Info" : "Display File Info"}
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </HStack>
        </Box>
      </Box>
    </GridItem>
  );
};

export default File;
