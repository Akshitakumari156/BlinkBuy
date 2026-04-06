const Category = require("../models/category");
const { fileUpload } = require("../utils/cloudUplod");

// create category
exports.createCategory = async(req,res)=>{
    try {
        // fetch data
        const {categoryName} = req.body;
        const categoryImage = req.files.image;
        
        // validation
        if(!categoryName || !categoryImage){
            return res.status(400).json({
                success:false,
                message:"Please fill all the input fiels"
            })
        }

        const isCategoryNameExist = await Category.findOne({categoryName:categoryName});

        if(isCategoryNameExist){
            return res.status(400).json({
                success:false,
                message:"Caregory name allready exist"
            })
        }

        const uploadImage = await fileUpload(categoryImage,"sourabh");

        // create new category
        const newCategory = await Category.create({
            categoryName:categoryName,
            categoryImage:uploadImage.secure_url,
        });

        // return response
        return res.status(200).json({
            success:true,
            message:"Category created Successfully",
            newCategory:newCategory,
        });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server error"
      });
        
    }
}

// get all categories
exports.getAllCategories = async(req,res)=>{
    try {

        // fetch all categories
        const allCategories = await Category.find({});

        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully fetched all categories",
            allCategories:allCategories,
        })

    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Internal Server error",
       })
        
    }
}

// get category details
exports.categoryDetails = async(req,res)=>{
    try {
        // fetch categoryId
        const categoryId = req.params.categoryId;

        // validation
        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong during fetching categoryId",
            })
        }

        const categoryPageDetails = await Category.findById(categoryId).populate("categoryAllProducts").exec();

        if(!categoryPageDetails){
            return res.status(404).json({
                success:false,
                message:"Category details not found",
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully fetched category page details",
            categoryPageDetails:categoryPageDetails,
        })
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server error",
      })
        
    }
}