const express = require("express");

const {
  adminLogin,
  getUsers,
  chanageBlockStatus,
  deleteUers,
  searchUser,
  adminAuth,
  logoutAdmin,
} = require("../controller/adminController");
const router = express.Router();
const { checkAllField } = require("../middlewares/formValidation");
const { verifyAdminToken } = require("../middlewares/verifyAdmin");

router.get("/getSample", (req, res) => {
  res.json({ status: "myr" });
});

router.post("/login", adminLogin);

router.post("/logout", verifyAdminToken, logoutAdmin);

router.get("/getUsers", verifyAdminToken, getUsers);

router.post("/isAdminAuth", verifyAdminToken, adminAuth);

router.post("/searchUser", verifyAdminToken, searchUser);

router.patch("/changeBlockStatus", verifyAdminToken, chanageBlockStatus);

router.post("/deleteUser", verifyAdminToken, deleteUers);

module.exports = router;

// verifyAdminToken
