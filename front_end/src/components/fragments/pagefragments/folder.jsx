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
import { FaFolder } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import truncateString from "@/components/utils/stringformatter";
const Folder = ({
  name,
  createdat,
  updatedat,
  id,
  parentId,
  files,
  handleOpen,
  handleRename,
  handleDelete,
}) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const displayExtraInfo = () => {
    setInfoVisible(!infoVisible);
  };
  return (
    <GridItem id={id}>
      <Box maxW="sm" borderWidth="1px" minH="3rem" animationName="fade-in" animationDuration="slowest">
        <Box p="4" spaceY="2">
          <HStack>
            <VStack alignItems="flex-start">
              <FaFolder size="5rem"></FaFolder>
              <Text textStyle="sm">{truncateString(name, 15)}</Text>
              <Text textStyle="sm">
                Total Size:{" "}
                <FormatByte
                  value={files.reduce((curr, total) => {
                    return curr.size + total;
                  }, 0)}
                >
                  {" "}
                </FormatByte>
              </Text>
              {infoVisible && (
                <>
                  <Text textStyle="sm">Created At: {createdat}</Text>
                  <Text textStyle="sm">Updated At: {updatedat}</Text>
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
                      value="open-folder"
                      onClick={(e) => handleOpen(e)}
                      id={id}
                      data-folder-name={name}
                      // TODO fix bug relating to names not rendering on the breadcrumbs
                    >Open Folder</Menu.Item>
                    <Menu.Item
                      value="delete-folder"
                      onClick={(e) => handleDelete(e)}
                      id={id}
                    >
                      Delete Folder
                    </Menu.Item>
                    <Menu.Item
                      value="rename-folder"
                      onClick={(e) => handleRename(e)}
                      id={id}
                      name={name}
                      
                    >
                      Rename Folder
                    </Menu.Item>
                    <Menu.Item
                      value="display-folder-info"
                      onClick={displayExtraInfo}
                    >
                      {infoVisible ? "Hide Folder Info" : "Display Folder Info"}
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

export default Folder;
