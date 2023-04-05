const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// adding a product to stock
exports.addProduct = catchAsyncErrors(async (req, res, next) => {
    const product = new Product(req.body)
    // console.log(req.user._id);
    // console.log(req.user.circle);
    product.user = req.user._id
    product.circle = req.user.circle

    await product.save();

    res.status(201).json({
        success: true,
        product,
    });
})

// getting all products from stock
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 5;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
    // this sd be removed
    // .pagination(resultPerPage);

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    //   apiFeature.pagination(resultPerPage);

    //   products = await apiFeature.query;

    res.status(200).json({
        success: true,
        productsCount,
        filteredProductsCount,
        resultPerPage,
        products,
    });
});

// get single product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) {
        return next(new ErrorHandler("Product not found wrond id given"))
    }
    res.status(200).json({
        success: true,
        product
    })
}
)

// update the given product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    console.log("in");

    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) {
        return next(new ErrorHandler("Product not found wrond id given"))
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    console.log("out");
    res.status(200).json({
        success: true,
        updated
    })
}
)

// delete the given product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    // console.log("in del");
    const id = req.params.id
    const product = await Product.findById(id)
    // console.log("out");
    if (!product) {
        return next(new ErrorHandler("Product not found wrond id given"))
    }
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })
}
)