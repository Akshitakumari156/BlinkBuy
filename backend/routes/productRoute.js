const express = require('express');
const router = express.Router();

const {uploadProduct,homePageProducts,getProductDetails,searchProduct,userProducts,deleteProduct,editProduct} = require("../controllers/productController");
const {checkAuth}  = require("../middlewares/auth");

router.post("/upload-product",checkAuth,uploadProduct);
router.get("/get-products",homePageProducts);
router.get("/productDetails/:productId",getProductDetails);
router.get("/searchProduct",searchProduct);
router.get("/userProducts",checkAuth,userProducts);
router.delete("/deleteProduct/:productId",checkAuth,deleteProduct);
router.put("/editProduct",checkAuth,editProduct);


module.exports = router;