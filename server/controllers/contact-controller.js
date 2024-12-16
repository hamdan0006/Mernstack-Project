const Contact =require("../models/contact");

const contactForm =async (req,res)=>{
    try {
        const response =req.body;
        await Contact.create(response);
        return res.status(200).json({message : "message sent successfully"})
    } catch (error) {
        console.error(error)
    }
}
module.exports = contactForm;