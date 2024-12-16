const validate = (schema) => async (req,res,next)=>{
try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
} catch (err) {
    const status = 422;
    const message = "Fill the details properly"
    const extraDetails =err.errors[0].message;
    console.log(message);
    const error ={
        status,
        message,
        extraDetails
        
    } 
    // res.status(400).json({msg : message})
    console.log(error)
    
    next(error)

}

}
module.exports =validate;