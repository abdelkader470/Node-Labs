import express from "express";
const app = express();
app.use(express.json());
import userRoutes from "./modules/users/user.routes.js";
import { initConnection } from "./db/connection.js";
app.use(userRoutes);
initConnection();
const port = 8080;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));