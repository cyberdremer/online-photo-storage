import Express from "express";
import topLevelRoute from "./routes/toplevel.js";
import passportConfig from "./config/passport.js";
import "dotenv/config";

const app = Express();
app.use(Express.urlencoded({ extended: true }));

app.use(topLevelRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 3000`);
});
