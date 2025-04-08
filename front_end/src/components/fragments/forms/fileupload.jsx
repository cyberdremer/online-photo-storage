import {
  Box,
  VStack,
  FileUpload,
  Heading,
  Button,
  Icon
 
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { SuccessAlert, ErrorAlert } from "../alerts/alerts";
import { useContext, useState } from "react";
import { AuthContext } from "@/components/context/auth";
const FileUploadBox = ({handleFileAccept}) => {
  const { cookie } = useContext(AuthContext);
  const [success, setSuccess] = useState({
    status: false,
    message: "",
  });
  const [error, setError] = useState({
    status: false,
    messsage: "",
  });

  return (
    <>
      <Box>
        <VStack gap="2rem">
          <Box>
            {success.status && (
              <SuccessAlert message={success.message}></SuccessAlert>
            )}
            {error.status && <ErrorAlert message={error.message}></ErrorAlert>}
          </Box>
          
          <FileUpload.Root
            maxW="xl"
            alignItems="stretch"
            onFileAccept={handleFileAccept}
            maxFiles={1}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone>
              <Icon size="md" color="fg.muted">
                <LuUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>Drag and drop a file here!</Box>
                <Box color="fg.muted">.png, .jpg up to 5MB</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.List />
          </FileUpload.Root>
          <Button>Upload</Button>
        </VStack>
      </Box>
    </>
  );
};

export default FileUploadBox;
