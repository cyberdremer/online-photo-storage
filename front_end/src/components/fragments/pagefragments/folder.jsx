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
    <GridItem id={id} onClick={handleOpen}>
      <Box maxW="sm" borderWidth="1px" minH="3rem">
        <Box p="4" spaceY="2">
          <HStack>
            <VStack alignItems="flex-start">
              <FaFolder size="5rem"></FaFolder>
              <Text textStyle="sm">{name}</Text>
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
            <Menu.Root >
              <Menu.Trigger asChild>
                <IconButton>
                  <BsThreeDotsVertical></BsThreeDotsVertical>
                </IconButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="delete-folder" onClick={handleDelete} id={{id, parentId}}>
                      Delete Folder
                    </Menu.Item>
                    <Menu.Item value="rename-folder" onClick={handleRename} id={{id, parentId}}>
                      Rename Folder
                    </Menu.Item>
                    <Menu.Item
                      value="display-folder-info"
                      onClick={displayExtraInfo}
                    >
                      {infoVisible
                        ? "Hide Folder Info"
                        : "Display Folder Info"}
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
