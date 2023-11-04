const express= require('express')
const router = express.Router()
const userController = require("../controllers/users-controller")
// POST /api/users/register
// POST /api/users/login

router.post("/register" , userController.register)
router.post("/login" , userController.login)

module.exports=router