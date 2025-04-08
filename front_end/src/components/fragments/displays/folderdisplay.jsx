import Folder from "../pagefragments/folder";

const FolderDisplay = ({ folders, handleOpen, handleRename, handleDelete }) => {
  return (
    <>
      {folders.map((folder) => {
        return <Folder
          name={folder.name}
          createdat={folder.createdat}
          updatedat={folder.updatedat}
          key={folder.id}
          files={folder.files}
          parentId={folder.parentId}
          handleOpen={handleOpen}
          handleRename={handleRename}
          handleDelete={handleDelete}
        ></Folder>;
      })}
    </>
  );
};

export default FolderDisplay;
