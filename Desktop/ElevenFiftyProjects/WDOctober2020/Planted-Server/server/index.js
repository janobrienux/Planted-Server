require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();
const controllers = require("./controllers");
// const router = express.Router()

app.use(require("./middleware/headers"));

app.use(express.json());

app.use("/user", controllers.usercontroller);
app.use("/plants", controllers.plantscontroller);

db.authenticate()
  .then(() => db.sync())

  .then(() => {
    app.listen(process.env.PORT, () => console.log(`[SERVER:] App is listening on Port ${process.env.PORT}`));
  })
  .catch((err) => {
    console.log("[SERVER:] Server Crashed");
    console.error(err);
  });
