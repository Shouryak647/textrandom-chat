const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getallUsers,
  deleteUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers, getallUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

// Route to delete user account
router.delete('/delete/:id', protect, deleteUser);


module.exports = router;
