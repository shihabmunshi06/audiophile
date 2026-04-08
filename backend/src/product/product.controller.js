import Product from "./product.model.js"

import asyncHandler from "../../utils/asyncHandler.js"

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

const getProductsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params
    const products = await Product.find({ category })
    if (!products.length) {
        res.status(404)
        throw new Error(`No products found in ${category} category`)
    }
    res.json(products)
})

const getProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const product = await Product.findById(productId).populate("others", "name image")
    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }
    res.json(product)
})

export { getProducts, getProductsByCategory, getProduct }