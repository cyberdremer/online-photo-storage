import {
  Flex,
  Portal,
  Text,
  useAlertStyles,
  Icon,
  HStack,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { LuFolderOpen } from "react-icons/lu";
import Header from "../fragments/pagefragments/header";
import AssetDisplay from "./assetdisplay";
import Footer from "../fragments/pagefragments/footer";
import { useContext, useReducer, useRef, useState } from "react";
import VaultHeader from "../fragments/pagefragments/vaultheader";
import { UserContext } from "../context/userinfo";
import useFetchAssets from "../effects/fetchFoldersAndFiles";
import {
  deleteFile,
  deleteFolder,
  downloadFile,
  postFile,
  postFolder,
  renameFile,
  renameFolder,
} from "../utils/requests";
import { AuthContext } from "../context/auth";
import {
  SuccessAlert,
  DeleteAlert,
  ErrorAlert,
} from "../fragments/alerts/alerts";
import GenericModal from "../fragments/modals/modals";
import FileDisplay from "../fragments/displays/filedisplay";
import FileUploadBox from "../fragments/forms/fileupload";
import FolderDisplay from "../fragments/displays/folderdisplay";
import ResourceForm from "../fragments/forms/resourceform";
import ModalReducer from "../reducers/modalreducer";
import download from "downloadjs";

const initialModalState = {
  fileDelete: false,
  fileUpload: false,
  fileRename: false,
  folderDelete: false,
  folderRename: false,
  folderCreate: false,
};

const AssetDashboard = () => {
  const { user, updateCurrentFolder } = useContext(UserContext);
  const { cookie } = useContext(AuthContext);
  const [folderHistory, setFolderHistory] = useState([
    { name: user.currentFolderName, id: user.currentFolderId },
  ]);
  const currentlySelectedFileRef = useRef(null);
  const currentlySelectedFolderRef = useRef(null);
  const parentOfCurrentlySelectedFolderRef = useRef(null);
  const { items, loading, error, setItems } = useFetchAssets(
    user.currentFolderId
  );

  const [modalVisible, dispatch] = useReducer(ModalReducer, initialModalState);

  const [requestError, setRequestError] = useState({
    status: false,
    message: "",
  });

  const [requestSuccess, setRequestSuccess] = useState({
    status: false,
    message: "",
  });

  const changeFileDeleteVisbility = (e) => {
    currentlySelectedFileRef.current = e.target.id;
    dispatch({ type: "displayFileDelete" });
  };

  const cleanUpRef = (action, ref) => {
    ref.current = null;
    dispatch({ type: action });
  };
  const changeFileRenameVisbility = (e) => {
    // TODO figure out why e is resolving got true in this action
    currentlySelectedFileRef.current = e.target.id;
    dispatch({ type: "displayFileRename" });
  };
  const changeFileUploadVisbility = (e) => {
    dispatch({ type: "displayFileUpload" });
  };

  const changeFolderDeleteVisbility = (e) => {
    currentlySelectedFolderRef.current = e.target.id;
    dispatch({ type: "displayFolderDelete" });
  };
  const changeFolderRenameVisbility = (e) => {
    // TODO figure out why e is resolving got true in this action
    currentlySelectedFolderRef.current = e.target.id;
    dispatch({ type: "displayFolderRename" });
  };
  const changeFolderCreateVisbility = (e) => {
    dispatch({ type: "displayFolderCreate" });
  };

  const handleFileRename = async (form) => {
    try {
      const response = await renameFile(
        currentlySelectedFileRef.current,
        form,
        cookie.usertoken
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      setRequestSuccess({
        status: true,
        message: response.data.message,
      });
      setTimeout(() => {
        setRequestSuccess({
          status: false,
          message: "",
        });
      }, 10000);
      const newFiles = items.files.map((file) => {
        if (file.id === Number(currentlySelectedFileRef.current)) {
          file.name = response.data.fileInfo.name;
          file.updatedat = response.data.fileInfo.updatedat;
        }
        return file;
      });

      setItems({ ...items, files: newFiles });
      cleanUpRef("displayFilename", currentlySelectedFileRef);
    } catch (error) {
      cleanUpRef("displayFileRename", currentlySelectedFileRef);
      setRequestError({
        status: true,
        message: error.message,
      });

      setTimeout(() => {
        setRequestError({
          status: false,
          message: "",
        });
      }, 10000);
    }
  };

  const handleFileDelete = async () => {
    try {
      const response = await deleteFile(
        currentlySelectedFileRef.current,
        cookie.usertoken
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      setRequestSuccess({
        status: true,
        message: response.data.message,
      });
      setTimeout(() => {
        setRequestSuccess({
          status: false,
          message: "",
        });
      }, 10000);

      const newFiles = items.files.filter(
        (file) => file.id !== Number(currentlySelectedFileRef.current)
      );
      setItems({
        ...items,
        files: newFiles,
      });
      cleanUpRef("displayFileDelete", currentlySelectedFileRef);
    } catch (error) {
      cleanUpRef("displayFileDelete", currentlySelectedFileRef);
      setRequestError({
        status: true,
        message: error.message,
      });

      setTimeout(() => {
        setRequestError({
          status: false,
          message: "",
        });
      }, 10000);
    }
  };

  const handleFileDownload = async (e) => {
    try {
      currentlySelectedFileRef.current = e.target.id;
      const { filename, file } = await downloadFile(
        currentlySelectedFileRef.current,
        cookie.usertoken
      );
      download(file, filename);

      setRequestSuccess({
        status: true,
        message: response.data.message,
      });
      setTimeout(() => {
        setRequestSuccess({
          status: false,
          message: "",
        });
      }, 10000);
    } catch (error) {
      setRequestError({
        status: true,
        message: error.message,
      });

      setTimeout(() => {
        setRequestError({
          status: false,
          message: "",
        });
      }, 10000);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const response = await postFile(
        user.currentFolderId,
        file,
        cookie.usertoken
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      const newFileArray = [
        ...items.files,
        {
          name: response.data.fileInfo.name,
          id: response.data.fileInfo.id,
          updatedat: response.data.fileInfo.updatedat,
          createdad: response.data.fileInfo.createdat,
          size: response.data.fileInfo.size,
        },
      ];

      setItems({ ...items, files: newFileArray });
      cleanUpRef("displayFileUpload", currentlySelectedFileRef);
    } catch (err) {
      cleanUpRef("displayFileUpload", currentlySelectedFileRef);
    }
  };

  const handleFolderChange = (e) => {
    const newFolderId = Number(e.target.id);
    const folderName = e.target.getAttribute("data-folder-name");
    setFolderHistory((prevHistory) => [
      ...prevHistory,
      { id: newFolderId, name: folderName },
    ]);

    updateCurrentFolder(newFolderId);
  };

  const handleFolderCreate = async (folderName) => {
    try {
      const response = await postFolder(
        user.currentFolderId,
        folderName,
        cookie.usertoken
      );
      if (response.error) {
        throw new Error(response.error.message);
      }

      const newFolderArray = [
        ...items.folders,
        {
          name: response.data.folderInfo.name,
          createdat: response.data.folderInfo.createdat,
          updatedat: response.data.folderInfo.updatedat,
          id: response.data.folderInfo.id,
          files: response.data.folderInfo.files,
        },
      ];
      setItems({ ...items, folders: newFolderArray });
      cleanUpRef("displayFolderCreate", currentlySelectedFolderRef);
    } catch (err) {
      cleanUpRef("displayFolderCreate", currentlySelectedFolderRef);
    }
  };
  const handleFolderRename = async (form) => {
    try {
      const response = await renameFolder(
        user.currentFolderId,
        Number(currentlySelectedFolderRef.current),
        form,
        cookie.usertoken
      );
      if (response.error) {
        throw new Error(response.error.message);
      }

      setRequestSuccess({
        status: true,
        message: response.data.message,
      });

      setTimeout(() => {
        setRequestSuccess({
          status: false,
          message: "",
        });
      });

      const newFolderArray = items.folders.map((folder) => {
        if (folder.id === Number(currentlySelectedFolderRef.current)) {
          folder.name = response.data.folderInfo.name;
          folder.updatedat = response.data.folderInfo.updatedat;
        }
        return folder;
      });

      setItems({ ...items, folders: newFolderArray });

      cleanUpRef("displayFolderRename", currentlySelectedFolderRef);
    } catch (error) {
      setRequestError({
        status: true,
        message: error.message,
      });

      setTimeout(() => {
        setRequestError({
          status: false,
          message: "",
        });
      }, 10000);
      cleanUpRef("displayFolderRename", currentlySelectedFolderRef);
    }
  };
  const handleFolderDelete = async () => {
    try {
      const response = await deleteFolder(
        currentlySelectedFolderRef.current,
        cookie.usertoken
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      setRequestSuccess({
        status: true,
        message: response.data.message,
      });
      setTimeout(() => {
        setRequestSuccess({
          status: false,
          message: "",
        });
      }, 10000);
      const newFolders = items.folders.filter(
        (folder) => folder.id !== Number(currentlySelectedFolderRef.current)
      );
      setItems({
        ...items,
        folders: newFolders,
      });

      cleanUpRef("displayFolderDelete", currentlySelectedFolderRef);
    } catch (error) {
      setRequestError({
        status: true,
        message: error.message,
      });

      setTimeout(() => {
        setRequestError({
          status: false,
          message: "",
        });
      }, 10000);
      cleanUpRef("displayFolderDelete", currentlySelectedFolderRef);
    }
  };

  return (
    <>
      <Flex grow="1" direction="column" minH="100vh">
        <Header></Header>
        <Portal>
          {requestError.status && (
            <ErrorAlert message={requestError.message}></ErrorAlert>
          )}
          {requestSuccess.status && (
            <SuccessAlert message={requestSuccess.message}></SuccessAlert>
          )}
        </Portal>
        <VaultHeader
          displayFileModal={changeFileUploadVisbility}
          displayFolderModal={changeFolderCreateVisbility}
          folderHistory={folderHistory}
          updateFolderHistory={setFolderHistory}
        ></VaultHeader>
        <DeleteAlert
          type="file"
          deleteTitle="Delete File"
          assetType={"file"}
          open={modalVisible.fileDelete}
          deleteAction={handleFileDelete}
          handleClose={changeFileDeleteVisbility}
        ></DeleteAlert>
        <GenericModal
          open={modalVisible.fileUpload}
          title={"Upload File"}
          handleClose={changeFileUploadVisbility}
        >
          <FileUploadBox
            handleFileAccept={handleFileUpload}
            changeModalVisiblity={changeFileUploadVisbility}
          ></FileUploadBox>
        </GenericModal>

        <GenericModal
          open={modalVisible.fileRename}
          title={"Rename File"}
          handleClose={changeFileRenameVisbility}
        >
          <ResourceForm
            success={requestSuccess.status}
            successMessage={requestSuccess.message}
            error={requestError.status}
            errorMessage={requestError.message}
            handleSubmission={handleFileRename}
            name={"New File Name: "}
          ></ResourceForm>
        </GenericModal>

        <GenericModal
          open={modalVisible.folderCreate}
          title={"Create Folder"}
          handleClose={changeFolderCreateVisbility}
        >
          <ResourceForm
            success={requestSuccess.status}
            successMessage={requestSuccess.message}
            error={requestError.status}
            errorMessage={requestError.message}
            handleSubmission={handleFolderCreate}
            name={"Folder Name: "}
          ></ResourceForm>
        </GenericModal>

        <GenericModal
          open={modalVisible.folderRename}
          title={"Rename Folder"}
          handleClose={changeFolderRenameVisbility}
        >
          <ResourceForm
            success={requestSuccess.status}
            successMessage={requestSuccess.message}
            error={requestError.status}
            errorMessage={requestError.message}
            handleSubmission={handleFolderRename}
            name={"New Folder Name:"}
          ></ResourceForm>
        </GenericModal>

        <DeleteAlert
          deleteTitle="Delete Folder"
          assetType={"folder"}
          open={modalVisible.folderDelete}
          deleteAction={handleFolderDelete}
          handleClose={changeFolderDeleteVisbility}
        ></DeleteAlert>

        <AssetDisplay loading={loading} error={error} items={items}>
          <SimpleGrid gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="1rem">
            <FolderDisplay
              folders={items.folders}
              handleOpen={handleFolderChange}
              handleDelete={changeFolderDeleteVisbility}
              handleRename={changeFolderRenameVisbility}
            ></FolderDisplay>
            <FileDisplay
              files={items.files}
              handleDelete={changeFileDeleteVisbility}
              handleDownload={handleFileDownload}
              handleRename={changeFileRenameVisbility}
            ></FileDisplay>
          </SimpleGrid>

          {/* <FolderDisplay
            folders={items.folders}
            handleOpen={handleFolderChange}
            handleDelete={changeFolderDeleteVisbility}
            handleRename={changeFolderRenameVisbility}
          ></FolderDisplay>
          <FileDisplay
            files={items.files}
            handleDelete={changeFileDeleteVisbility}
            handleDownload={handleFileDownload}
            handleRename={changeFileRenameVisbility}
          ></FileDisplay> */}
        </AssetDisplay>
        <Footer></Footer>
      </Flex>
    </>
  );
};

export default AssetDashboard;
