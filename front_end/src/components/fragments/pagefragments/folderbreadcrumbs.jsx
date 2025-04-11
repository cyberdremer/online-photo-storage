import { Breadcrumb, Button, Icon } from "@chakra-ui/react";
import { LiaSlashSolid } from "react-icons/lia";
import { BsFolder, BsFolder2Open, BsFileArrowDown } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "@/components/context/userinfo";
const FolderBreadCrumbs = ({ folderHistory, updateFolderHistory }) => {
  const { updateCurrentFolder } = useContext(UserContext);

  const popSkippedChildren = (e) => {
    const idOfSelectedFolder = Number(e.target.id);
    const indexOfSelectedFolder = folderHistory.findIndex((folder) => {
      return folder.id === idOfSelectedFolder;
    });
    let newFileHistory = [...folderHistory];
    newFileHistory = newFileHistory.slice(0, indexOfSelectedFolder + 1);
    updateFolderHistory(newFileHistory);
    updateCurrentFolder(idOfSelectedFolder);
  };

  return (
    <>
      <Breadcrumb.Root variant={"underline"} size="lg" padding={"1rem"}>
        <Breadcrumb.List>
          {folderHistory.map((folder, index) => {
            if (index !== folderHistory.length - 1) {
              return (
                <>
                  <Breadcrumb.Item id={folder.id}>
                    <Breadcrumb.Link
                      id={folder.id}
                      onClick={(e) => popSkippedChildren(e)}
                      href="#"
                    >
                      <BsFolder></BsFolder>
                      {folder.name}
                    </Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <LiaSlashSolid></LiaSlashSolid>
                  </Breadcrumb.Separator>
                </>
              );
            } else {
              return (
                <>
                  <Breadcrumb.Item id={folder.id}>
                    <Breadcrumb.Link
                      id={folder.id}
                      onClick={(e) => popSkippedChildren(e)}
                      href="#"
                    >
                      <BsFolder2Open></BsFolder2Open>
                      {folder.name}
                    </Breadcrumb.Link>
                  </Breadcrumb.Item>
                </>
              );
            }
          })}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </>
  );
};

export default FolderBreadCrumbs;
