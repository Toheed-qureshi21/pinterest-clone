import TryCatch from "../utils/TryCatch.js";
import getDataUri from "../utils/uriGenerator.js";
import cloudinary from "cloudinary"
import {Pin} from "../models/pinModel.js"


export const createPin = TryCatch(async(req,res)=>{
    const {title,pin} = req.body;
    const file =  req.file;
    const fileUrl =  getDataUri(file);


    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);
    await Pin.create({
        title,
        pin,
        image:{
            id:cloud.public_id,
            url:cloud.secure_url,
        },
        createdBy:req.user._id, 
    });
    res.json({message:"Pin created successfully"})
})

export const getAllPins = TryCatch(async(req,res)=>{
    const pins = await Pin.find().sort({createdAt:-1});
    return res.json(pins);
});

export const getSinglePin = TryCatch(async(req,res)=>{
    const pin = await Pin.findById(req.params.id).populate("createdBy","-password");
    return res.json(pin);
})
export const commentForPin = TryCatch(async(req,res)=>{
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
        return res.status(400).json({message:"No Pin found with this id"});
    }

    pin.comments.push({
        user:req.user._id,
        name:req.user.username,
        comment:req.body.comment,
    });

    await pin.save();
    return res.json({message:"Comment added"});

});

export const deleteComment =TryCatch(async(req,res)=>{
 
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
        return res.status(400).json({message:"No Pin found with this id"});
    }
    if (!req.query.commentId) {
        return res.status(404).json({message:"Comment id required"})
    }

    const commentIndex =  pin.comments.findIndex((item)=>{
       return item._id.toString()===req.query.commentId.toString()
    });

    if (commentIndex===-1) {
        return res.status(404).json({message:"No comment found"})
    }

    const comment = pin.comments[commentIndex];

    if (comment.user.toString()===req.user._id.toString()) {
        pin.comments.splice(commentIndex,1);
        await pin.save();
        return res.status(200).json({
            message:"Comment deleted successfully"
        });

    } else{
        return res.status(403).json({message:"Unauthorized! You are not owner of this comment"});
    }

    
})

export const deletPin = TryCatch(async(req,res)=>{
        const pin = await Pin.findById(req.params.id);
        if (!pin) {
            return res.status(400).json({message:"No Pin found with this id"});
        }
        if (pin.createdBy.toString()!==req.user._id.toString()) {
            return res.status(403).json({message:"Unauthorized! You are not owner of this pin"});
        }
        await cloudinary.v2.uploader.destroy(pin.image.id);
        await pin.deleteOne();

        return res.json({message:"Pin deleted successfully"})

});

export const updatePin = TryCatch(async(req,res)=>{
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
        return res.status(400).json({message:"No Pin found with this id"});
    }
    if (pin.createdBy.toString()!==req.user._id.toString()) {
        return res.status(403).json({message:"Unauthorized! You are not owner of this pin"});
    }
    pin.title = req.body.title;
    pin.pin = req.body.pin;
    await pin.save();
   return res.json({message:"Pin updated"})
})