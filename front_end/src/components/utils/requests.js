import { data } from "react-router-dom";
import formToObject from "./objecttoform";

const formPostRequest = async (form, url) => {
  // Can throw error that is handled by the caller
  const formData = formToObject(form);
  const query = new URLSearchParams(formData).toString();

  const response = await fetch(url, {
    method: "post",
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
  const response = await fetch(`http://localhost:4000/file/${fileId}`, {
    method: "delete",
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
  const response = await fetch(`http://localhost:4000/file/${folderId}`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: uploadFileFormData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const renameFile = async (fileId, form, token) => {
  const formData = formToObject(form);
  const query = new URLSearchParams(formData).toString();
  const response = await fetch(`http://localhost:4000/file/${fileId}`, {
    method: "put",
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
  const response = await fetch(`http://localhost:4000/file/${fileId}`, {
    method: "get",
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
    `http://localhost:4000/folder/${parentFolderid}`,
    {
      method: "post",
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
    `http://localhost:4000/folder/${parentFolderId}/${folderId}`,
    {
      method: "put",
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
  const response = await fetch(`http://localhost:4000/folder/${folderId}`, {
    method: "delete",
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
