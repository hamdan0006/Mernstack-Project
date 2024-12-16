const User =require("../models/user-model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const home = async (req, res) => {
    try {
      
        res.status(200).send("Hello at homepage");
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        const {username,email,phone,password} = req.body;

        const userExist = await User.findOne({email :email});
        if(userExist){

            return res.status(400).json({message: 'Email already exists'});
        }
        // Hash the passwod 
        // const saltRound =10;
        // const hash_password = await bcrypt.hash(password,saltRound);
        
       const userCreated =  await User.create({username,email,phone,password});

        res.status(201).json({
        msg: "Registration Successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });

    } catch (error) {
        next(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // const isPasswordValid = await bcrypt.compare(password, userExist.password);

        const isPasswordValid = await userExist.comparePassword(password);

        if (isPasswordValid) {
            res.status(201).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };

module.exports = { home, register, login,user };
