const { sign } = require("jsonwebtoken");
const user = require("../model/userModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const createToken = ({ userName, password }) =>
  sign({ username: userName, password: password }, "jwtAdminSecrect");

module.exports = {
  adminLogin: (req, res) => {
    console.log("in admin login");
    const { userName, password } = req.body;

    if (userName !== "admin" || password !== "123") {
      res.json({ loginStatus: false, message: "creditials are in correct" });
    } else {
      res
        .cookie("admin-access-token", createToken(req.body), {
          maxAge: 60 * 60 * 24 * 30 * 1000,
        })
        .json({ loginStatus: true, message: "login success..." });
    }
  },

  /*
   * @params nohting
   *return user array
   */
  getUsers: async (req, res) => {
    try {
      const data = await user.find();
      res.status(200).json({ data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  /*
   * @params userId
   * @return block status ;
   */

  chanageBlockStatus: async (req, res) => {
    const { id } = req.body;

    try {
      var { blockStatus: currentStatus } = await user.findById(id);
    } catch (err) {
      res.status(400).json({
        error_name: err.name,
        eroor_stack: err.stack,
        errro_message: err.message,
      });
      return;
    }
    // updation
    try {
      const result = await user.updateOne(
        {
          _id: objectId(id),
        },
        {
          $set: {
            blockStatus: !currentStatus,
          },
        }
      );
      if (result.modifiedCount) {
        res.status(200).json({
          message: "Block status updated ",
          newBlocStatus: !currentStatus,
        });
      } else {
        res.status(400).json({
          message: "somthing went wrong ",
          newBlocStatus: currentStatus,
        });
      }
    } catch (err) {
      res.status(400).json({
        message: err.message,
        newBlocStatus: currentStatus,
      });
    }
  },

  deleteUers: async (req, res) => {
    const { id } = req.body;
    console.log("in the delte user router" + id);

    try {
      const result = await user.findById(id);
      console.log(result);
      if (result == null) {
        res
          .status(400)
          .json({ message: "User not found please  check   the id " });
        return;
      }
    } catch (err) {
      res.status(400).json({
        error_name: err.name,
        eroor_stack: err.stack,
        errro_message: err.message,
      });
      return;
    }

    try {
      const { deletedCount } = await user.deleteOne({ _id: objectId(id) });
      if (deletedCount) {
        res.status(200).json({ message: "user deleted successfully " });
      } else {
        res.status(400).json({ message: "sorry somthing went wrong !" });
      }
    } catch (err) {
      res.status(400).json({
        error_name: err.name,
        eroor_stack: err.stack,
        errro_message: err.message,
      });
    }
  },

  searchUser: (req, res) => {
    const { searchTag: sc } = req.body;

    console.log(sc);
  },
  adminAuth: (req, res) => {
    console.log("in the admin auth router ");
    res.status(200).json("admin is authenticated");
  },
  logoutAdmin: (req, res) => {
    console.log("in the admin logout ");
    res.clearCookie("admin-access-token");
    res.json({ status: true, message: "user loged out successfully" });
  },
};
