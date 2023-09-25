const express = require("express");
const { createUser,login,getUser } = require("../controller/user");
const router = express.Router();

router.post("/create", createUser);
router.get('/login', login)
router.get('/user',getUser)

module.exports = router;
