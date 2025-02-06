import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary"
import connectDatabse from "./Database/db.js";
import router from "./routes/userRoutes.js";
import pinrouter from "./routes/pinRoutes.js"
import path from "path"

dotenv.config();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_SECRET,
});

const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/api/user",router);
app.use("/api/pin",pinrouter);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname,"/Frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"Frontend","dist","index.html"));
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDatabse();
}
);