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
      "INSERT INTO products(name, brand, image_url, price, category) VALUES($1,$2,$3,$4,$5) returning *;",
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

    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.put("/:productId", async (req, res, next) => {
  try {
    const oldObject = await pool.query("SELECT * FROM products");
    const index = oldObject.rows.findIndex(
      (x) => x.id.toString() === req.params.productId
    );
    const foundObject = oldObject.rows[index];

    console.log();
    const data = await pool.query(
      "UPDATE products SET name=$1, brand=$2, image_url=$3,price=$4, category=$5 WHERE id=$6 RETURNING *",
      [
        req.body.name || foundObject.name,
        req.body.brand || foundObject.brand,
        req.body.image_url || foundObject.image_url,
        req.body.price || foundObject.price,
        req.body.category || foundObject.category,
        req.params.productId || foundObject.productId,
      ]
    );
    res.status(200).send(req.body);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [
      req.params.productId,
    ]);
    res.send("🆗deleted");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default productRouter;
