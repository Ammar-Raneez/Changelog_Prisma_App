import { Router } from "express";
import { body } from "express-validator";

import { handleInputErrors } from "./modules/middleware";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdateById,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", getProductById);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct,
);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct,
);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", getUpdates);

router.get("/update/:id", getUpdateById);

const updateIdPutFields = [
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
] as const;

router.put("/update/:id", ...updateIdPutFields, updateUpdate);

const updatePostFields = [
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  //
] as const;

router.post("/update", ...updatePostFields, createUpdate);

router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */
router.get("/update-point", () => {});

router.get("/update-point/:id", () => {});

const updatePointIdPutFields = [
  body("name").optional().isString(),
  body("description").optional().isString(),
  //
] as const;

router.put("/update-point/:id", ...updatePointIdPutFields, () => {});

const updatePointPostFields = [
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  //
] as const;

router.post("/update-point", ...updatePointPostFields, () => {});

router.delete("/update-point/:id", () => {});

router.use((err: any, _, res, _1) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
