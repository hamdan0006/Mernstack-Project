const User =require("../models/user-model");
const Contact =require("../models/contact");
const { user } = require("./auth-controller");
const getAllUsers =async(req,res)=>{

try {
    const users = await User.find({},{password : 0})
    if(!users || users === 0){
      return  res.status(404).json({message:"No users found" })
    }
   return res.status(200).json(users)

    
} catch (error) {
    next(error)
}
}

// usere delete logic

const deleteUser = async(req,res)=>{
try {
  const id =req.params.id;
  await User.deleteOne({_id: id})

  return res.status(200).json({message : "User deleted successfully"})

} catch (error) {
  next(error)
}
}

// user update logic 

const getUserById =async(req,res)=>{
try {
  const id =req.params.id;
  const data =await User.findOne({_id: id} ,{password : 0})
  return res.status(200).json(data)
  
} catch (error) {
  console.log(error)
}
}

// update user by id 

const updateUserById =async(req,res)=>{
  try {
  const id =req.params.id;
  const UserData = req.body;

  const updatedUserData =await User.updateOne({_id:id},{$set :UserData})
  return res.status(200).json(updatedUserData)
    
  } catch (error) {
    next(error)
  }
}

// get contact users


const getContacts= async(req,res) =>{
  try {
    const contacts =await Contact.find()
    if(!contacts || contacts.length === 0){
      return res.status(404).json({message:"No contacts found" })
    }
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
}

// delete contact 

const deleteContact = async(req,res)=>{
  try {
    const id =req.params.id;
    await Contact.deleteOne({_id: id})
  
    return res.status(200).json({message : "Contact deleted successfully"})
  
  } catch (error) {
    next(error)

  }
  }
module.exports ={getAllUsers,getContacts,deleteUser,getUserById,updateUserById,deleteContact}