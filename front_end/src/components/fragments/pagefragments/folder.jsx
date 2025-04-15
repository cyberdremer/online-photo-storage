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
import ModeColors from "@/components/utils/modecolors";
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
  const {primary, secondary, primaryText, secondaryText} = ModeColors();
  

  const displayExtraInfo = () => {
    setInfoVisible(!infoVisible);
  };
  return (
    <GridItem id={id}>
      <Box
        maxW="sm"
        borderWidth="1px"
        minH="11rem"
        animationName="fade-in"
        animationDuration="slowest"
        backgroundColor={primary}
        borderRadius={10}
        shadow={"2xl"}
      >
        <Box p="4" spaceY="2">
          <HStack>
            <VStack alignItems="flex-start" gap="7">
              <FaFolder size="5rem"></FaFolder>
              <Text textStyle="sm" color={primaryText} fontSize="lg">{truncateString(name, 15)}</Text>
              <Text>Number of files: {files.length}</Text>
              <Text textStyle="sm" color={primaryText}>
                Total Size:{" "}
                <FormatByte
                  value={files.reduce((total, currrentFolder) => {
                    return total + currrentFolder.size;
                  }, 0)}
                >
                  {" "}
                </FormatByte>
              </Text>
              {infoVisible && (
                <>
                  <Text color={primaryText} textStyle="sm">Created At: {createdat}</Text>
                  <Text color={primaryText} textStyle="sm">Updated At: {updatedat}</Text>
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
                  <Menu.Content backgroundColor={secondary}>
                    <Menu.Item
                      value="open-folder"
                      onClick={(e) => handleOpen(e)}
                      id={id}
                      data-folder-name={name}
                      color={secondaryText}
                      // TODO fix bug relating to names not rendering on the breadcrumbs
                    >
                      Open Folder
                    </Menu.Item>
                    <Menu.Item
                      value="delete-folder"
                      onClick={(e) => handleDelete(e)}
                      id={id}
                      color={secondaryText}
                    >
                      Delete Folder
                    </Menu.Item>
                    <Menu.Item
                      value="rename-folder"
                      onClick={(e) => handleRename(e)}
                      id={id}
                      name={name}
                      color={secondaryText}
                    >
                      Rename Folder
                    </Menu.Item>
                    <Menu.Item
                      value="display-folder-info"
                      onClick={displayExtraInfo}
                      color={secondaryText}
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
