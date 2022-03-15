import express from "express";
const productRouter = express.Router();
import pool from "../utils/db.js";

productRouter.get("/", async (req, res, next) => {
  try {
    const data = await pool.query("SELECT * FROM products");
    res.send(data.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productRouter.post("/", async (req, res, next) => {
  try {
    const data = await pool.query(
      "INSERT INTO products(product_name, product_brand, product_image, product_price, product_category) VALUES($1,$2,$3,$4,$5) returning *;",
      [
        req.body.name,
        req.body.brand,
        req.body.image,
        req.body.price,
        req.body.category,
      ]
    );
    console.log("this is data: ", data);
    const product = data.rows[0];

    res.status(201).send(JSON.parse(product));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.delete("/:productId", async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productRouter.put("/:productId", async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default productRouter;
