import {
  Box,
  VStack,
  FileUpload,
  HStack,
  Heading,
  Button,
  Icon,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { SuccessAlert, ErrorAlert } from "../alerts/alerts";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "@/components/context/auth";
const FileUploadBox = ({ handleFileAccept, changeModalVisiblity }) => {
  const fileRef = useRef(null);
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
            maxFiles={1}
            onFileAccept={(e) => {
              fileRef.currentFile = e.files;
            }}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone>
              <Icon size="md" color="fg.muted">
                <LuUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>Drag and drop a file here to upload!</Box>
                <Box color="fg.muted">.png, .jpg up to 5MB</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.List />
            <HStack justify="space-between" flexGrow="1">
              <Button onClick={changeModalVisiblity}>Cancel</Button>
              <Button onClick={() => handleFileAccept(fileRef.currentFile)}>Upload</Button>
            </HStack>
          </FileUpload.Root>
        </VStack>
      </Box>
    </>
  );
};

export default FileUploadBox;
