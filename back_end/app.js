const express = require("express");
const errorHandler = require("./middleware/error");
const topLevelRoute = require("./routes/toplevel");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({limit: '10mb', extended: true }));
app.use(cors());

app.use(topLevelRoute);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
