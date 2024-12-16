const {z} =require("zod");

const loginSchema =z.object({
    email :z.string({required_error : "Email is required"}).trim().min(10,{message : "Email must be of minimum 10 characters"})

    .max(255,{message : "Email must be of maximum 255 characters"}),

    password :z.string({required_error : "Password is required"}).trim().min(6,{message : "Password must be of minimum 6 characters"})
    .max(1024,{message : "Password must be of maximum 20 characters"})

})

const signUpSchema = loginSchema.extend({
    username :z.string({required_error : "Name is required"}).trim().min(3,{message : "Name must be of minimum 3 characters"})
    .max(255,{message : "Name must be of maximum 3 characters"}),


   

    phone :z.string({required_error : "Phone number is required"}).trim().min(10,{message : "Phone number must be of minimum 10 characters"})
    .max(20,{message : "Phone number must be of maximum 20 characters"}),

    

});

module.exports = {signUpSchema,loginSchema};