const formToObject = (form) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

export default formToObject;
