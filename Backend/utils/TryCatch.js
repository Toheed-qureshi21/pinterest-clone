const TryCatch = (handlerfunction) => {
  return async(req,res)=>{
    try {
        await handlerfunction(req,res);
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
  }
}
export default TryCatch