const OTP = require("../models/otp");
const User = require("../models/user");
const otpGenerator = require("otp-generator");
const bacrypt = require("bcrypt");


// create and send otp
exports.createOpt = async(req,res)=>{
  try {

    // fetch email
    const {email} = req.body;

    // validation 
    if(!email){
        return res.status(400).json({
            success:false,
            message:"please fill all the input fileds",
        });
    }

    // check is user allready have an account
    const userDetails = await User.findOne({email:email});

    if(userDetails){
        return res.status(400).json({
            success:false,
            message:"User allready have an account",
        })
    }
     
    // generate otp
const newOtp = otpGenerator.generate(4, {
  upperCaseAlphabets: false,
  lowerCaseAlphabets: false,
  specialChars: false,
 
});


    // create entry in db
    const newOpt = await OTP.create({
        email:email,
        otp:newOtp,
    });


    // return response
    return res.status(200).json({
        success:true,
        message:"Otp created successfully",
        newOpt,      
    });

  
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Internal Setver error",
       })
        
    }

}

// Sign Up
exports.signUp =async(req,res)=>{
    try {
        // fetch data
        const {firstName,lastName,password,confirmPassword,otp,email} = req.body;

        // validation
        if(!firstName || !lastName || !password || !confirmPassword || !otp || !email){
            return res.status(400).json({
                success:false,
                message:"Please fill all the input fields.",
            })
        }
        
        // check password and confirmPassword is same or not
        if(password !== confirmPassword){
         return res.status(400).json({
            success:false,
            message:"Password and confirmPassword not matched."
         })
        }


        // check user allready registered or not
        const userExistence = await User.findOne({email:email});

        if(userExistence){
            return res.status(400).json({
                success:false,
                message:"User allready registered"
            })
        }

        // find latest otp
        const latestOtp = await OTP.findOne({email:email}).sort({createdAt:-1});

        if(!latestOtp){
            return res.status(404).json({
                success:false,
                message:"Otp not found"
            })
        }

        // verfiy otp
        if(otp !== latestOtp.otp){
            return res.status(400).json({
                success:false,
                message:"Otp not matched"
            })
        }

      
        // hash the password
        const hashedPassword = await bacrypt.hash(password,10);

        // careate profile picture
        const profilePicture =  await `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}`


        // create entry in db
        const newUser = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPassword,
            profilePicture:profilePicture,
        })

        // return response
        return res.status(200).json({
            success:true,
            message:"Account created successfully",
            newUser:newUser,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error",
        })
        
    }
}


