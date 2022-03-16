import express from "express";
import productRouters from "./services/products/index.js";
import reviewRouters from "./services/reviews/index.js";
import cors from "cors";
import pool from "./services/utils/db.js";
import { testConnection } from "./services/utils/db.js";

const server = express();
server.use(express.json());
server.use(cors());

const port = process.env.PORT || 5001;

server.use("/products", productRouters);
server.use("/reviews", reviewRouters);

const initialization = async () => {
  try {
    await pool.query("select 1+1");
    server.listen(port, () => {
      console.log("💚 Server works on port ", port);
      testConnection();
    });

    server.on("error", (error) => {
      console.log("The server does not work", error);
    });
  } catch (error) {
    console.log(error);
  }
};

initialization();
