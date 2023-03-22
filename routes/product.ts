import express from "express";
import ProductController from "../controllers/ProductController";

const router = express.Router();

router.get("/getAllProducts", ProductController.getAllProducts);

export default router;
