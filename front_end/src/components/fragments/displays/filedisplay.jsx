import File from "../pagefragments/file";

const FileDisplay = ({ files, handleDownload, handleRename, handleDelete }) => {
  return (
    <>
      {files.map((file) => {
        return (
          <File
            name={file.name}
            createdat={file.createdat}
            updatedat={file.updatedat}
            handleDownload={handleDownload}
            handleDelete={handleDelete}
            handleRename={handleRename}
            folderid={file.folderid}
            id={file.id}
            key={file.id}
            size={file.size}
          ></File>
        );
      })}
    </>
  );
};

export default FileDisplay;
