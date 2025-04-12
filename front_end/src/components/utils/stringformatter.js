const truncateString = (string, length) => {
  if (string.length < length) {
    return string;
  } else {
    return string.slice(0, length) + "...";
  }
};

export default truncateString;