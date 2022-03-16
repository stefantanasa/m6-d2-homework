import express from "express";
import pool from "../utils/db.js";

const reviewRouter = express.Router();
reviewRouter.get("/", async (req, res, next) => {
  try {
    const data = await pool.query("SELECT * FROM reviews");
    res.send(data.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.post("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    console.log("this is data: ", productId);
    const data = await pool.query(
      "INSERT INTO reviews(comment, rate, product_id) VALUES($1,$2,$3) returning *;",
      [req.body.comment, req.body.rate, productId]
    );
    const product = data.rows[0];

    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const oldObject = await pool.query("SELECT * FROM reviews");
    const index = oldObject.rows.findIndex(
      (x) => x.id.toString() === req.params.reviewId
    );
    const foundObject = oldObject.rows[index];

    console.log();
    const data = await pool.query(
      "UPDATE reviews SET comment=$1, rate=$2, product_id=$3 WHERE id=$4 RETURNING *",
      [
        req.body.comment || foundObject.comment,
        req.body.rate || foundObject.rate,
        req.body.product_id || foundObject.product_id,
        req.params.reviewId || foundObject.reviewId,
      ]
    );
    res.status(200).send(req.body);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
reviewRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM reviews WHERE id = $1", [
      req.params.reviewId,
    ]);
    res.send("🆗deleted");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default reviewRouter;
