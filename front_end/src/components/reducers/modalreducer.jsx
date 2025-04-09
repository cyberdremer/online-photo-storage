const ModalReducer = (modalVisbility, action) => {
  switch (action.type) {
    case "displayFileUpload":
      return {
        ...modalVisbility,
        fileUpload: !modalVisbility.fileUpload,
      };
    case "displayFileRename":
      return {
        ...modalVisbility,
        fileRename: !modalVisbility.fileRename,
      };

    case "displayFileDelete":
      return {
        ...modalVisbility,
        fileDelete: !modalVisbility.fileDelete,
      };

    case "displayFolderDelete":
      return {
        ...modalVisbility,
        folderDelete: !modalVisbility.folderDelete,
      };

    case "displayFolderRename":
      return {
        ...modalVisbility,
        folderRename: !modalVisbility.folderRename,
      };

    case "displayFolderCreate":
      return {
        ...modalVisbility,
        folderCreate: !modalVisbility.folderCreate,
      };

    default: {
      throw new Error("Uknown action" + action.type);
    }
  }
};



export default ModalReducer;