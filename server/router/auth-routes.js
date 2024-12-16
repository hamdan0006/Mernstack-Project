const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth-controller');
const {signUpSchema,loginSchema} =require("../validator/auth-validator");
const validate =require("../middleware/middleware-validator");
const authMiddleware =require("../middleware/auth-middleware")

router.route("/").get(authControllers.home); 
router.route("/register").post(validate(signUpSchema),authControllers.register); 

// // Add a route handler for GET requests to /api/auth/register
// router.route("/register").get((req, res) => {
//     // Handle the GET request here
//     res.status(200).send("GET request received at /api/auth/register");
// });

router.route("/login").post(validate(loginSchema),authControllers.login); 
router.route("/user").get(authMiddleware, authControllers.user);
module.exports = router;