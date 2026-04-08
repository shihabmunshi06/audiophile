import mongoose from "mongoose";

import User from "../src/user/user.model.js";
import Product from "../src/product/product.model.js";
import Order from "../src/order/order.model.js";

import { products, users } from "../db/data.js";

const seeder = async () => {
    try {
        await Product.deleteMany()
        console.log("Products deleted!")

        const productsWithoutOthers = products.map(product => ({
            ...product,
            others: []
        }))
        const seededProducts = await Product.insertMany(productsWithoutOthers)

        const idMap = {}
        seededProducts.forEach((seededProduct, index) => {
            const originalId = products[index].id
            idMap[originalId] = seededProduct._id
        })

        for (let i = 0; i < seededProducts.length; i++) {
            const newOthers = products[i].others.map(oldId => idMap[oldId])
            await Product.findByIdAndUpdate(seededProducts[i]._id, {
                others: newOthers
            })
        }

        await User.insertMany(users)
        console.log("products and usres added")
        
    } catch (error) {
        console.log("Error seeding data!", error)
    }
}

export default seeder
