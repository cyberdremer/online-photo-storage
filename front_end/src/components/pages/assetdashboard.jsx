import { Flex, Portal } from "@chakra-ui/react";
import Header from "../fragments/pagefragments/header";
import AssetDisplay from "./assetdisplay";
import Footer from "../fragments/pagefragments/footer";
import { useContext, useRef, useState } from "react";
import VaultHeader from "../fragments/pagefragments/vaultheader";
import { UserContext } from "../context/userinfo";
import useFetchAssets from "../effects/fetchFoldersAndFiles";

import {
  deleteFile,
  deleteFolder,
  downloadFile,
  renameFile,
  updateFolder,
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
import FolderResourceForm from "../fragments/forms/resourceform";

const AssetDashboard = () => {
  const { user, updateCurrentFolder } = useContext(UserContext);
  const { cookie } = useContext(AuthContext);
  const fileRef = useRef(null);
  const { items, loading, error, setItems } = useFetchAssets(
    user.currentFolderId
  );
  //TODO Whenever we rename a folder, delete a folder, upload a file, rename a file or delete a file, we need to update
  //  the items from the fetchAssets hook, we can do this be using the setItems function from the hook. Using the folder or file id
  // as the replacing criteria.

  const [openDelete, setOpenDelete] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    fileDelete: false,
    fileUpload: false,
    fileRename: false,
    folderDelete: false,
    folderRename: false,
    folderCreate: false,
  });

  const [requestError, setRequestError] = useState({
    status: false.value,
    message: "",
  });

  const [requestSuccess, setRequestSuccess] = useState({
    status: false,
    message: "",
  });

  const changeFileDeleteVisbility = (e) => {
    const { id } = e.target.id;
    fileRef.current = id;
    setModalVisible({
      ...modalVisible,
      fileDelete: !modalVisible.fileDelete,
    });
  };

  const changeFileUploadVisbility = () => {
    setModalVisible({
      ...modalVisible,
      fileUpload: !modalVisible.fileUpload,
    });
  };
  const changeFileRenameVisbility = () => {
    
    setModalVisible({
      ...modalVisible,
      fileRename: !modalVisible.fileRename,
    });
  };
  const changeFolderDeleteVisbility = () => {
    setModalVisible({
      ...modalVisible,
      folderDelete: !modalVisible.folderDelete,
    });
  };
  const changeFolderRenameVisbility = () => {
    setModalVisible({
      ...modalVisible,
      folderRename: !modalVisible.folderRename,
    });
  };
  const changeFolderCreateVisbility = () => {
    setModalVisible({
      ...modalVisible,
      folderCreate: !modalVisible.folderCreate,
    });
  };

  const handleFileRename = async (form) => {
    try {
      const response = await renameFile(ref.currentId, form, cookie.usertoken);
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
        if (file.id === fileRef.current) {
          return {
            ...file,
            name: form.name,
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
      const response = await deleteFile(fileRef.current, cookie.usertoken);
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
        (file) => file.id !== fileRef.current
      );
      setItems({
        ...items,
        files: newFiles,
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

  const handleFileUpload = async () => {};

  const handleFolderChange = (e) => {
    const folderId = e.target.id;
    updateCurrentFolder(folderId);
  };
  const handleFolderRename = (folderId, name) => {};
  const handleFolderDelete = async (folderId) => {
    try {
      const response = await deleteFolder(folderId, cookie.usertoken);
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
            <ErrorAlert
              status={requestError.status}
              message={requestError.message}
            ></ErrorAlert>
          )}
          {requestSuccess.status && (
            <SuccessAlert
              status={requestSuccess.status}
              message={requestSuccess.message}
            ></SuccessAlert>
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
          <FolderResourceForm
            success={requestSuccess.status}
            successMessage={requestSuccess.message}
            error={requestError.status}
            errorMessage={requestError.message}
            handleSubmission={() => {}}
            name={"New File Name: "}
          ></FolderResourceForm>
        </GenericModal>

        <GenericModal
          isOpen={modalVisible.folderCreate}
          title={"Create Folder"}
          setOpen={changeFolderCreateVisbility}
        >
          <FolderResourceForm
            success={requestSuccess.status}
            successMessage={requestSuccess.message}
            error={requestError.status}
            errorMessage={requestError.message}
            handleSubmission={() => {}}
            name={"Folder Name: "}
          ></FolderResourceForm>
        </GenericModal>

        <GenericModal
          isOpen={modalVisible.folderRename}
          title={"Rename Folder"}
          setOpen={changeFolderRenameVisbility}
        >
          <FolderResourceForm
          success={requestSuccess.status}
          successMessage={requestSuccess.message}
          error={requestError.status}
          errorMessage={requestError.message}
          handleSubmission={() => {}}
          name={"New Folder Name:"}
          ></FolderResourceForm>
        </GenericModal>

        <DeleteAlert
          deleteTitle="Delete Folder"
          assetType={"file"}
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
