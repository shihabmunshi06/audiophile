import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                name: String,
                image: String,
                price: Number,
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        shippingAddress: {
            fullName: String,
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
            email: String,
            phone: Number,
            zip: Number
        },
        paymentMethod: {
            type: String,
            enum: ["e-money", "cash-on-delivery"],
            required: true
        },
        paymentResult: {
            id: String,
            status: String,
            updateTime: String,
            email: String
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0
        },
        shippingCost: {
            type: Number,
            required: true,
            default: 0
        },
        vat: {
            type: Number,
            required: true,
            default: 0
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        },
        orderStatus: {
            type: String,
            enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled"
            ],
            default: "pending"
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        paidAt: Date,
        isDelivered: {
            type: Boolean,
            default: false
        },
        deliveredAt: Date
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;