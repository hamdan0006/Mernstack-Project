const adminMiddleware =async(req,res,next)=>{

    try {
        console.log(req.user)
        const adminRole =req.user.Isadmin;
        if(!adminRole){
            return res.status(401).json({message:"You are not authorized to access this route"})

        }
        // res.status(200).json({mesaage : req.user.Isadmin})
        next();
    } catch (error) {
        next(error)
    }

}
module.exports = adminMiddleware;