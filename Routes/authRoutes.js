const express = require("express");
const router = express.Router();

const {
  SignUp,
  SignIn,
  current,
  deleteAccount,
  updateProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../Controllers/authController");

const { isAuth } = require("../Middlewares/isAuth");
const { verifyRole } = require("../Middlewares/roleMiddleware");

const {
  verifSignUp,
  verifSignIn,
  validation,
} = require("../Middlewares/validation");

router.post("/SignUp", verifSignUp, validation, SignUp);
router.post("/SignIn", verifSignIn, validation, SignIn);

router.get("/current", isAuth, current);
router.put("/update", isAuth, updateProfile);
router.delete("/delete", isAuth, deleteAccount);

// Admin only
router.get("/all-users", isAuth, verifyRole(["Admin","SubAdmin"]), getAllUsers);
router.put("/update-user/:id", isAuth, verifyRole(["Admin","SubAdmin"]), updateUser);
router.delete("/delete-user/:id", isAuth, verifyRole(["Admin","SubAdmin"]), deleteUser);

module.exports = router;
