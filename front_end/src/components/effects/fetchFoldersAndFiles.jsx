import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth";
const useFetchAssets = (folderId) => {
  const { cookie } = useContext(AuthContext);
  const [folderUrl, setFolderUrl] = useState("http://localhost:4000/folder");
  const [items, setItems] = useState({
    folders: [],
    files: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${folderUrl + '/' + folderId}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.usertoken}`,
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const foldersAndFiles = await response.json();
        setItems({
          ...items,
          folders: foldersAndFiles.data.folders,
          files: foldersAndFiles.data.files,
        });
        setLoading(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [folderUrl, folderId]);

  return { items, loading, error, setItems };
};

export default useFetchAssets;
