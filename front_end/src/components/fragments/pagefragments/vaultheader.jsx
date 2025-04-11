import {
  HStack,
  Group,
  IconButton,
  Icon,
  Heading,
  Breadcrumb,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaFolderPlus, FaFileUpload, FaSadCry } from "react-icons/fa";
import { UserContext } from "../../context/userinfo";
import { Link } from "react-router-dom";
import FolderBreadCrumbs from "./folderbreadcrumbs";

const VaultHeader = ({
  displayFileModal,
  displayFolderModal,
  folderHistory,
  updateFolderHistory,
}) => {

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" padding="1rem">
        <FolderBreadCrumbs folderHistory={folderHistory} updateFolderHistory={updateFolderHistory}></FolderBreadCrumbs>
        <Group gap="1rem">
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
