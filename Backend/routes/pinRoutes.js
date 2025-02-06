import express from "express";
import { isAuth } from "../middlewares/Auth.js";
import uploadFile from "../middlewares/multer.js";
import { commentForPin, createPin, deleteComment, deletPin, getAllPins, getSinglePin, updatePin } from "../controllers/pinControllers.js";
const router = express.Router();
router.post('/new',isAuth,uploadFile,createPin);
router.get('/all',isAuth,getAllPins);
router.get("/:id",isAuth,getSinglePin);
router.put("/:id",isAuth,updatePin);
router.delete("/:id",isAuth,deletPin);
router.post("/comment/:id",isAuth,commentForPin);
// In delete route :id refers to pin id  
router.delete("/comment/:id",isAuth,deleteComment);
export default router;