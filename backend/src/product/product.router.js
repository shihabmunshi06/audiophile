import { Router } from "express"

import { getProducts, getProductsByCategory, getProduct } from "./product.controller.js"

const productRouter = Router()

productRouter.get("/", getProducts)
productRouter.get("/category/:category", getProductsByCategory)
productRouter.get("/:productId", getProduct)

export default productRouter