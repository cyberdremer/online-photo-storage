const express = require("express");
const topLevelRoute = require("./routes/toplevel");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(topLevelRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 3000`);
});
