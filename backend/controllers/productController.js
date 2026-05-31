const User = require("../models/user");
const Product = require("../models/product");
const Category = require("../models/category");
const { fileUpload } = require("../utils/cloudUplod");

// upload product
exports.uploadProduct = async(req,res)=>{
    try {
        // fetch data
         const {productName,description,price,categoryId,
            condition,location,sellerId,contactNumber} = req.body;

        // fetch all images
        const {images} = req.files;
    
        // validation
        if(!productName || !description || !price || !categoryId || 
            !condition || !location || !sellerId || !contactNumber){
                return res.status(400).json({
                    success:false,
                    message:"Please fill all the input fields",
                })
            }

        // check is user defaulter or not
        const sellerDetails = await User.findOne({_id:sellerId});

       if(sellerDetails.isDefaulter > 10){
            return res.status(400).json({
                success:false,
                message:"You are blocked to sell products",
            })
        }

        // upload image to  cloudinary

        let uploadedImages = [];

        // if only one image 
        if(!Array.isArray(images)){
           const result = await fileUpload(images,process.env.FOLDER_NAME);
           uploadedImages.push({
            url:result.secure_url,
            public_id:result.public_id,
           })
        }

        // if multiple images 
        else{

            for(let image of images){
                const result = await fileUpload(image,process.env.FOLDER_NAME);
                 uploadedImages.push({
                url:result.secure_url,
                public_id:result.public_id,
              })
            }

        }

        // create product
        const newProduct = await Product.create({
            productName:productName,
            description:description,
            price:price,
            category:categoryId,
            condition:condition,
            location:location,
            sellerId:sellerId,
            contactNumber:contactNumber,
            images:uploadedImages,
        })
        
        // update category
        const updatedCategory = await Category.findByIdAndUpdate(categoryId,{
            $push:{categoryAllProducts:newProduct._id}
        },{new:true});

        // return response
        return res.status(200).json({
            success:true,
            message:"Product uploaded successfully",
            newProduct:newProduct,
            updatedCategory:updatedCategory,
        })
        
    } catch (error) {
     console.log(error);
     return res.status(500).json({
        success:false,
        message:"Internal Server error",
     })
        
    }
}

// get products for home page
exports.homePageProducts = async(req,res)=>{
    try {

        const page = Number( req.query.page) || 1;
        const limit = 12 ;

        const skip = (page - 1) * limit ;
     
        // fetch products 
        const allProducts = await Product.find({}).sort({createdAt:-1}).skip(skip).limit(limit);

        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully fetched products",
            allProducts:allProducts,
        })
        
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Internal Server error",
       })
        
    }
}

// get Product details
exports.getProductDetails = async(req,res)=>{
    try {
        // fetch productId
        const productId = req.params.productId;

        // validation
        if(!productId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong during fetching productId",
            })
        }
        
        // find productDetails
        const ProductDetails = await Product.findById(productId).populate("sellerId","-password").exec();

        if(!ProductDetails){
            return res.json({
                success:false,
                message:"ProductDetails not found",
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully fetched product details",
            ProductDetails:ProductDetails,
        })
        
    } catch (error) {
     console.log(error);
     return res.status(500).json({
        success:false,
        message:"Internal Server error",
     })
        
    }
}

// product search
exports.searchProduct = async(req,res)=>{
    try {
        // fetch data
        const {textSearch} = req.query;

       // validation
        if(!textSearch){
            return res.status(400).json({
                success:false,
                message:"Please fill the input field",
            })
        }

        // search category
        const categories = await Category.find({
            categoryName:{$regex:textSearch,$options:"i"},
        }).select("_id");


       const allCategories = categories.map((cat)=> cat._id);

         // search the product
        const allProducts = await Product.find({
          $or:[
            {  productName:{$regex:textSearch,$options:"i"},},
            {category:{$in:allCategories}},
            {description:{$regex:textSearch,$options:"i"}}
          ]
        });

        // reuturn response
        return res.status(200).json({
            success:true,
            message:"Succesfully search products",
            allProducts:allProducts,
        })
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server error",
      })
        
    }
}

// fetch user upload all products
exports.userProducts = async(req,res)=>{
    try {
        // fetch user id
        const userId = req.user.userId;

        // validation 
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Something went during fetching userId",
            })
        }

        // fetch all user products
        const allProducts = await Product.find({sellerId:userId}).sort({createdAt:-1});

        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully fetched all products of user",
            allProducts:allProducts,
        })
        
    } catch (error) {
     console.log(error);
     return res.status(500).json({
        success:false,
        message:"Internal Server error",
     })
        
    }
}

// delete product
exports.deleteProduct = async(req,res)=>{
    try {
        // fetch productId
        const {productId} = req.params;

        // validation
        if(!productId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong during fetching productId",
            })
        }

        // check is product exist or not
        const productDeatils = await Product.findById(productId);

        if(!productDeatils){
            return res.status(400).json({
                success:false,
                message:"Product not found",
            })
        }

        // delete the product
        const deletedProduct = await Product.findByIdAndDelete(productId);

        // return response
        return res.status(200).json({
            success:true,
            message:"Succesfully delete the product",
        })
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server error",
      })
        
    }
}

// edit product
exports.editProduct = async(req,res)=>{
    try {
         // fetch data
         const {productName,description,price,category,
            condition,location,sellerId,contactNumber,_id} = req.body;

          // validation
        if(!productName || !description || !price || !category || 
            !condition || !location || !sellerId || !contactNumber || !_id){
                return res.status(400).json({
                    success:false,
                    message:"Please fill all the input fields",
                })
            }
            
            // check is product is exist or not 
            const productDeatils = await Product.findById(_id);

            if(!productDeatils){
                return res.status(404).json({
                    success:false,
                    message:"Product not found",
                })
            }

        // update product
        const updatedProduct = await Product.findByIdAndUpdate(_id,{
            productName:productName,
            description:description,
            price:price,
            category:category,
            condition:condition,
            location:location,
            sellerId:sellerId,
            contactNumber:contactNumber,
        },{new:true});

        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully product is updated",
        })

    } catch (error) {
     console.log(error);
     return res.status(500).json({
        success:false,
        message:"Internal Server error",
     })
        
    }
}