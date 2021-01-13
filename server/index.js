require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();
const controllers = require("./controllers");
// const router = express.Router()

app.use(require("./middleware/headers"));

app.use(express.json());
bodyParser = {
  json: {limit: '50mb', extended: true},
  urlencoded: {limit: '50mb', extended: true}
};

app.use("/user", controllers.usercontroller);
app.use("/plants", controllers.plantscontroller);
app.use("/comments", controllers.commentscontroller);

db.authenticate()
  .then(() => db.sync())

  .then(() => {
    app.listen(process.env.PORT, () => console.log(`[SERVER:] App is listening on Port ${process.env.PORT}`));
  })
  .catch((err) => {
    console.log("[SERVER:] Server Crashed");
    console.error(err);
  });
