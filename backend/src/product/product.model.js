import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true
        },
        features: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            enum: ["headphones", "speakers", "earphones"]
        },
        image: {
            mobile: String,
            tablet: String,
            desktop: String
        },
        categoryImage: {
            mobile: String,
            tablet: String,
            desktop: String
        },
        gallery: {
            first: {
                mobile: String,
                tablet: String,
                desktop: String
            },
            second: {
                mobile: String,
                tablet: String,
                desktop: String
            },
            third: {
                mobile: String,
                tablet: String,
                desktop: String
            }
        },
        includes: [
            {
                quantity: Number,
                item: String
            }
        ],
        others: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        newProduct: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        rating: {
            average: {
                type: Number,
                default: 0,
                min: 0,
                max: 5
            },
            count: {
                type: Number,
                default: 0
            }
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;