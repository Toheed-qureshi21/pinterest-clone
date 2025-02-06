import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/Tokens.js";

export const registerUser = TryCatch(async(req,res)=>{
    const {username,email,password} = req.body;
    let user = await User.findOne({email});
    if (user) {
        return res.status(400).json({
            message:"Already have an account with this email",
        });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create({
        username,
        email,
        password:hashedPassword,
    })
    generateToken(user._id,res);
   return res.status(201).json({user,message:"User registered successfully"});
})

export const loginUser = TryCatch(async(req,res)=>{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message:"No user found with this email"
            });
        }
        const comparePassword = await bcrypt.compare(password,user.password);
        if (!comparePassword) {
            return res.status(400).json({
                message:"Invalid Password"
            });
        }
        generateToken(user._id,res);
      return  res.json({user,message:"Logged in successfully"});
})  
export const userProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    return  res.status(200).json(user);
})
export const anotherUserProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");

    res.json(user);
});
export const followAndUnfollowUser = TryCatch(async(req,res)=> {
    const user = await User.findById(req.params.id);
    const loggedInWalaUser = await User.findById(req.user._id);
    if (!user) {
        return res.status(400).json({message:"No user with this id"})
    }
    if (user._id.toString()===loggedInWalaUser.id.toString()) {
        return res.status(400).json({message:"User cannot follow itself"});
    }
    if (user.followers.includes(loggedInWalaUser._id)) {
        const indexFollowing = loggedInWalaUser.following.indexOf(user._id);
        const indexFollowers = user.followers.indexOf(loggedInWalaUser._id);
        loggedInWalaUser.following.splice(indexFollowing,1);
        user.followers.splice(indexFollowers,1);
        await loggedInWalaUser.save();
        await user.save();
       return res.json({message:"User unfollowed successfully"});
    }else{
        
        loggedInWalaUser.following.push(user._id);
        user.followers.push(loggedInWalaUser._id);
        await loggedInWalaUser.save();
        await user.save();
        return res.json({message:"User followed successfully"});
    }
})

export const logoutUser = TryCatch(async(req,res)=>{
       res.cookie("token","",{maxAge:0});
         res.json({message:"Logout successfully"});
        
         
})