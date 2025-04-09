import { Flex, Portal } from "@chakra-ui/react";
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
  formPostRequest,
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
  const currentlySelectedFileRef = useRef(null);
  const currentlySelectedFolderRef = useRef(null);
  const { items, loading, error, setItems } = useFetchAssets(
    user.currentFolderId
  );
  //TODO Whenever we rename a folder, delete a folder, upload a file, rename a file or delete a file, we need to update
  //  the items from the fetchAssets hook, we can do this be using the setItems function from the hook. Using the folder or file id
  // as the replacing criteria.

  const [openDelete, setOpenDelete] = useState(false);

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
  const changeFileRenameVisbility = (e) => {
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
          return {
            ...file,
            name: form.name,
            updatedat: response.data.fileInfo.updatedat,
          };
        }
        return file;
      });
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
      dispatch({ type: "displayFileDelete" });
    } catch (error) {
      dispatch({ type: "displayFileDelete" });
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

  const handleFileDownload = async () => {
    try {
      const response = await downloadFile(fileRef.current, cookie.usertoken);
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

  const handleFileUpload = async () => {
    try {
    } catch (err) {}
  };

  const handleFolderChange = (e) => {
    const folderId = e.target.id;
    updateCurrentFolder(folderId);
  };

  const handleFolderCreate = async (form, parentId) => {
    try {
      const response = await formPostRequest(
        form,
        `http://localhost:4000/folder/${parentId}`
      );
      if (response.error) {
        throw new Error(response.error.message);
      }

      const newFolderArray = [
        ...items.files,
        {
          name: response.data.folderInfo.name,
          createdat: response.data.folderInfo.createdat,
          updatedat: response.data.folderInfo.updatedat,
          id: response.data.folderInfo.id,
        },
      ];
      setItems({ ...items, files: newFolderArray });
    } catch (err) {}
  };
  const handleFolderRename = async (name) => {
    try {
      const response = await renameFolder(
        currentlySelectedFolderRef.current,
        name,
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
          return {
            ...items.folders,
            name: form.name,
            updatedat: response.data.folderInfo.updatedat,
          };
        }
        return file;
      });
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
  const handleFolderDelete = async (folderId) => {
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
        (folder) => folder.id !== folderId
      );
      setItems({
        ...items,
        folders: newFolders,
      });
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

  return (
    <>
      <Flex grow="1" direction="column" padding="1rem">
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
        ></VaultHeader>
        <DeleteAlert
          type="file"
          deleteTitle="Delete File"
          assetType={"file"}
          open={modalVisible.fileDelete}
          deleteAction={handleFileDelete}
          handleClose={changeFileDeleteVisbility}
          // TODO add a prop for handling the deletion of the file.
          // TODO get file ID from the file object, should be in file object id prop
        ></DeleteAlert>
        <GenericModal
          isOpen={modalVisible.fileUpload}
          title={"Upload File"}
          setOpen={changeFileUploadVisbility}
        >
          <FileUploadBox
            folderId={user.currentFolderId}
            handleFileAccept={handleFileUpload}
          ></FileUploadBox>
        </GenericModal>

        <GenericModal
          isOpen={modalVisible.fileRename}
          title={"Rename File"}
          setOpen={changeFileRenameVisbility}
        >
          <ResourceForm
            success={requestSuccess.status}
            successMessage={requestSuccess.message}
            error={requestError.status}
            errorMessage={requestError.message}
            handleSubmission={() => {}}
            name={"New File Name: "}
          ></ResourceForm>
        </GenericModal>

        <GenericModal
          isOpen={modalVisible.folderCreate}
          title={"Create Folder"}
          setOpen={changeFolderCreateVisbility}
        >
          <ResourceForm
            success={requestSuccess.status}
            successMessage={requestSuccess.message}
            error={requestError.status}
            errorMessage={requestError.message}
            handleSubmission={() => {}}
            name={"Folder Name: "}
          ></ResourceForm>
        </GenericModal>

        <GenericModal
          isOpen={modalVisible.folderRename}
          title={"Rename Folder"}
          setOpen={changeFolderRenameVisbility}
        >
          <ResourceForm
            success={requestSuccess.status}
            successMessage={requestSuccess.message}
            error={requestError.status}
            errorMessage={requestError.message}
            handleSubmission={() => {}}
            name={"New Folder Name:"}
          ></ResourceForm>
        </GenericModal>

        <DeleteAlert
          deleteTitle="Delete Folder"
          assetType={"folder"}
          open={modalVisible.folderDelete}
          deleteAction={() => {}}
          handleClose={changeFolderDeleteVisbility}
          // TODO add a prop for handling the deletion of the file.
          // TODO get file ID from the file object, should be in file object id prop
        ></DeleteAlert>

        <AssetDisplay loading={loading} error={error}>
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
        </AssetDisplay>
        <Footer></Footer>
      </Flex>
    </>
  );
};

export default AssetDashboard;
