import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    rootFolderId: null,
    rootFolderName: "root",
    currentFolderId: null,
    currentFolderName: "root",
  });

  const initUser = (user) => {
    setUser({
      ...user,
      username: user.username,
      rootFolderId: user.rootFolderId,
      currentFolderId: user.rootFolderId,
      currentFolderName: "root",
    });
  };

  const updateCurrentFolder = (currentFolderId, currentFolderName) => {
    const sanitizedFolderId =
      user.rootFolderId === currentFolderId ? "" : currentFolderId;
    setUser({
      ...user,
      currentFolderId: sanitizedFolderId,
      currentFolderName: currentFolderName,
    });
  };

  const removeUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, initUser, updateCurrentFolder, removeUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
