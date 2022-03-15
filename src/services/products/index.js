import express from "express";
const productRouter = express.Router();

productRouter.get("/", (req, res, next) => {});
productRouter.post("/", (req, res, next) => {});
productRouter.delete("/:productId", (req, res, next) => {});
productRouter.put("/:productId", (req, res, next) => {});

export default productRouter;
