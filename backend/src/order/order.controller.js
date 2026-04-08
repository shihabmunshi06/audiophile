import Order from "./order.model.js"

import asyncHandler from "../../utils/asyncHandler.js"

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
    res.json(orders)
})

const getOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const order = await Order.findById(orderId)
    if (!order) return res.status(404).json({ message: "Order not found" })
    res.json(order)
})

const addOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body

    if (!orderItems || orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
    }

    const order = await Order.create(req.body)
    res.status(201).json(order)
})


export { getOrders, getOrder, addOrder, }