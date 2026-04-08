import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import productRouter from "./src/product/product.router.js"
import orderRouter from "./src/order/order.router.js"

import connectDB from "./db/db.js"
import seeder from "./db/seeder.js"

import errorHandler from "./middleware/errorMiddleware.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/products", productRouter)
app.use("/orders", orderRouter)

app.use(errorHandler)

const PORT = process.env.port || 3000;

const startServer = async () => {
    try {
        await connectDB()
        // await seeder()
        app.listen(PORT, () => console.log(`server running on ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startServer()
