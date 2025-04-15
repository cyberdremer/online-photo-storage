import {
  HStack,
  Group,
  IconButton,
  Icon,
  Heading,
  Breadcrumb,
  Button,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaFolderPlus, FaFileUpload, FaSadCry } from "react-icons/fa";
import { UserContext } from "../../context/userinfo";
import { Link } from "react-router-dom";
import FolderBreadCrumbs from "./folderbreadcrumbs";
import ModeColors from "@/components/utils/modecolors";

const VaultHeader = ({
  displayFileModal,
  displayFolderModal,
  folderHistory,
  updateFolderHistory,
  items,
  setItems,
}) => {
  const { primary, buttonBackground, buttonText, secondary, secondaryText } =
    ModeColors();

  const handleSortChronologically = () => {
    let sortedFiles = [...items.files];
    sortedFiles.sort((a, b) => {
      return new Date(a.createdat) - new Date(b.createdat);
    });
    let sortedFolders = [...items.folders];
    sortedFolders = sortedFolders.sort((a, b) => {
      return new Date(a.createdat) - new Date(b.createdat);
    });

    setItems({ ...items, folders: sortedFolders, files: sortedFiles });
  };

  const handleSortAlphabetically = () => {
    let sortedFolders = [...items.folders];
    sortedFolders = sortedFolders.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    let sortedFiles = [...items.files];
    sortedFiles = sortedFiles.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    setItems({ ...items, files: sortedFiles, folders: sortedFolders });
  };

  const handleSortByNumberOfFiles = () => {
    let sortedFolders = [...items.folders];
    sortedFolders.sort((a, b) => {
      return b.files.length - a.files.length;
    });

    setItems({ ...items, folders: sortedFolders });
  };

  return (
    <>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
        backgroundColor={primary}
      >
        <FolderBreadCrumbs
          folderHistory={folderHistory}
          updateFolderHistory={updateFolderHistory}
        ></FolderBreadCrumbs>
        <Group gap="1rem">
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button>Sort By</Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content backgroundColor={secondary} color={secondaryText}>
                  <Menu.Item
                    onClick={handleSortChronologically}
                    color={secondaryText}
                  >
                    Creation Date
                  </Menu.Item>
                  <Menu.Item
                    onClick={handleSortAlphabetically}
                    color={secondaryText}
                  >
                    Alphabetical Order
                  </Menu.Item>
                  <Menu.Item
                    onClick={handleSortByNumberOfFiles}
                    color={secondaryText}
                  >
                    Number of items in a folder
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <IconButton onClick={displayFolderModal}>
            <FaFolderPlus></FaFolderPlus>
          </IconButton>
          <IconButton onClick={displayFileModal}>
            <FaFileUpload></FaFileUpload>
          </IconButton>
        </Group>
      </HStack>
    </>
  );
};

export default VaultHeader;
