const express = require("express");
const router = express.Router();

const { createUser,getAllUsers, searchProfiles, editUser, login, editUserProfile, deleteUser, UserAccount } = require("../controllers/user");
const { auth } = require("../middleware/auth");

router.post("/createUser",auth,createUser);
router.get("/getAllUsers",getAllUsers);
router.get("/searchProfiles",searchProfiles);
router.put("/editUser",editUser);
router.post("/login",auth,login);
router.put("/editUserProfile",auth,editUserProfile);
router.delete('/deleteUser',auth,deleteUser);
router.get("/userAccount/:_id",UserAccount);

module.exports = router;

