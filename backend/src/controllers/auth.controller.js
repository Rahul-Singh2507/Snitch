import config from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";


const sendTokenResponse = (user, res, message) => {
      console.log("SECRET:", config.JWT_SECRET);  // 👈 ADD HERE
  const token = jwt.sign(
    { id: user._id },
    config.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(201).json({
    message,
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      contact: user.contact,
      role: user.role
    }
  });
};



const register = async (req,res)=>{
    try{
const {email,password,contact,fullname,isSeller}=req.body;
const isExistingUser = await userModel.findOne({
    $or:[
        {email},
        {contact}
    ]
})

if(isExistingUser){
    return res.status(400).json({
    message:"user with this email or contact already exists"
    })
}

const user = await userModel.create({
    email,
    password,
    contact,
    fullname,
    role:isSeller ? "seller" : "buyer"
})

await sendTokenResponse(user,res,"user registered sucessfully")
   

    }catch(error){
        console.error("Error in user registration:", error);
        res.status(500).json({ message: "Internal server error" });
}
}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message:"invalid credentials"})
        }           
        const isPasswordMatch = await user.comparePassword(password);

        if(!isPasswordMatch){
            return res.status(400).json({message:"invalid credentials"})
        }

        await sendTokenResponse(user,res,"user logged in sucessfully")

    }
    catch(error){
        console.error("Error in user login:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}
export {register,login}