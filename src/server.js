import express from "express";
import productRouters from "./services/products/index.js";
import cors from "cors";
import pool from "./services/utils/db.js";

const server = express();
server.use(express.json());
server.use(cors());

const port = process.env.PORT || 5001;
console.log(process.env.PORT);
server.use("/products", productRouters);

const initialization = async () => {
  try {
    await pool.query("select 1+1");
    server.listen(port, () => {
      console.log("Server works on port ", port);
    });

    server.on("error", (error) => {
      console.log("The server does not work", error);
    });
  } catch (error) {
    console.log(error);
  }
};

initialization();
