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
  const response = await fetch(`http://localhost:4000/file/${folderId}`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: file,
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

const downloadFile = async (folderId, token) => {
  const response = await fetch(`https://localhost:4000/file/${folderId}`, {
    method: "get",
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

const postFolder = async (folderId, folder, token) => {
  const formData = formToObject(folder);
  const query = new URLSearchParams(formData).toString();

  const response = await fetch(`http://localhost:4000/folder/${folderId}`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: query,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const renameFolder = async (folderId, folder, token) => {
  const formData = formToObject(folder);
  const query = new URLSearchParams(formData).toString();
  const response = await fetch(`http://localhost:4000/folder/${folderId}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: query,
  });
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
  deleteFolder
};
