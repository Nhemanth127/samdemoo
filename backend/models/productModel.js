const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, "Please Enter stock Name"],
        trim: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price per kg"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        // maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "SellingCircleMember",
        required: true,
    },
    circle: {
        type: mongoose.Schema.ObjectId,
        ref: "SellingCircle",
        required: true,
    },
    location: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
            maxLength: [6, "PinCode cannot exceed 6 characters"],
            minLength: [6, "Picode should have atleast 6 characters"],
        }
    },
    community: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
