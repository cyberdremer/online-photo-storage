const express = require("express");
const errorHandler = require("./middleware/error");
const topLevelRoute = require("./routes/toplevel");
const https = require("https");
const cors = require("cors");
const redirectHttpToHttps = require("./middleware/redirecthttp");
require("dotenv").config();

// const key = process.env.HTTPS_SERVER_KEY;
// const cert = process.env.HTTPS_SERVER_CERT;
// const passphrase = process.env.HTTPS_PASSPHRASE;
// const credentials = { key: key, cert: cert, passphrase };
const app = express();

// const httpsServer = https.createServer(credentials, app);

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({ origin: process.env.ORIGIN_URL }));
// app.use(redirectHttpToHttps);

app.use(topLevelRoute);
app.use(errorHandler);

// httpsServer.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
