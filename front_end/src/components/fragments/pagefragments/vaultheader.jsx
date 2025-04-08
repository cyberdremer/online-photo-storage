import { HStack, Group, IconButton, Icon, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { FaFolderPlus, FaFileUpload, FaSadCry } from "react-icons/fa";
import { UserContext } from "../../context/userinfo";

const VaultHeader = ({ displayFileModal, displayFolderModal }) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <HStack justify="space-between">
        <Icon>
          <Heading>{user.currentFolderName}</Heading>
        </Icon>
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
