import express from "express"
import cors from "cors"

import data from "./data.js"
const app = express()
const port = 3000;

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json(data)
})

app.get('/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filteredProducts = data.filter(p => p.category.toLowerCase() === category);

    if (filteredProducts.length > 0) {
        return res.status(200).json(filteredProducts);
    }
    res.status(404).json({ error: "No products in this category" });
});

app.get("/product/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const product = data.find(p => p.id === id);
    if (product) {
        return res.status(200).json(product)
    }
    res.status(404).json({ error: "No matching product found" });
})

app.listen(port, () => console.log("server connected"))