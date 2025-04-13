const formatValidatorError = (errors) => {
  return errors.map((error) => {
    return error.msg;
  });
};

module.exports = formatValidatorError;
