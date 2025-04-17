import { data } from "react-router-dom";
import formToObject from "./objecttoform";
import backendUrl from "./backendurl";

const formPostRequest = async (form, url) => {
  // Can throw error that is handled by the caller
  const formData = formToObject(form);
  const query = new URLSearchParams(formData).toString();

  const response = await fetch(url, {
    method: "post",
    mode: 'cors',
    body: query,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const getItemsRequest = async (form, url, token) => {
  const response = await fetch(url, {
    method: "get",
    mode: 'cors',
  
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const deleteFile = async (fileId, token) => {
  const response = await fetch(`${backendUrl + "/file/" + fileId}`, {
    method: "delete",
    mode: 'cors',

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const postFile = async (folderId, file, token) => {
  const uploadFileFormData = new FormData();
  uploadFileFormData.append("uploadedFile", file[0]);
  const response = await fetch(
    `${backendUrl + "/file/" + folderId}`,
    {
      method: "post",
      mode: 'cors',
 

      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: uploadFileFormData,
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const renameFile = async (fileId, form, token) => {
  const formData = formToObject(form);
  const query = new URLSearchParams(formData).toString();
  const response = await fetch(`${backendUrl + "/file/"+ fileId}`, {
    method: "put",
    mode: 'cors',

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: query,
  });

  if (!response.ok) {
    throw new Error(response.error.message || response.statusText);
  }

  const data = await response.json();
  return data;
};

const downloadFile = async (fileId, token) => {
  const response = await fetch(`${backendUrl + "/file/" + fileId}`, {
    method: "get",
    mode: 'cors',
  

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const file = await response.blob();
  // TODO fix the content-disposition header not showing up in the response. I would like for the downloads to be of the names of their original filename

  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return { file };
};

const postFolder = async (parentFolderid, folder, token) => {
  const formData = formToObject(folder);
  const query = new URLSearchParams(formData).toString();

  const response = await fetch(
    `${backendUrl + "/folder/"+ parentFolderid}`,
    {
      method: "post",
      mode: 'cors',

   
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: query,
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const renameFolder = async (parentFolderId, folderId, newName, token) => {
  const formData = formToObject(newName);
  const query = new URLSearchParams(formData).toString();
  const response = await fetch(
    `${backendUrl+"/folder/"}${parentFolderId}/${folderId}`,
    {
      method: "put",
      mode: 'cors',
    
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: query,
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const deleteFolder = async (folderId, token) => {
  const response = await fetch(`${backendUrl + "/folder/" + folderId}`, {
    method: "delete",
    mode: 'cors',

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.error.message || response.statusText);
  }
  const data = await response.json();
  return data;
};

export {
  formPostRequest,
  getItemsRequest,
  deleteFile,
  postFile,
  postFolder,
  renameFolder,
  downloadFile,
  renameFile,
  deleteFolder,
};
