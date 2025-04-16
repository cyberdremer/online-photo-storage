const redirectHttpToHttps = (req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.hostname + req.originalUrl}`);
};


module.exports = redirectHttpToHttps;
