const { sign } = require("jsonwebtoken");
const user = require("../model/userModel");

const createToken = ({ userName, _id }) =>
  sign({ username: userName, id: _id }, "jwtserect");

module.exports = {
  /*
   * @params username , password
   *  return loging status
   */
  register: async (req, res) => {
    console.log(req.body);
    const { userName, password, email } = req.body;

    const exitsUser = await user.findOne({ email: email });
    console.log(exitsUser);

    if (exitsUser != null) {
      res.json({
        registerStatus: false,
        message: "Email is already exits please do login",
      });
      return;
    }
    try {
      const result = await user(req.body).save();

      res
        .status(200)
        .cookie("access-token", createToken(result), {
          maxAge: 60 * 60 * 24 * 30 * 1000,
        })
        .json({ registerStatus: true, username: userName });
    } catch (err) {
      console.log(err.message);
      res.json({ registerStatus: false, message: err.message });
    }
  },

  login: async (req, res) => {
    const result = await user.findOne({ email: req.body.email });
    if (!result) {
      res.json({
        loginStatus: false,
        message: "Can't find the  Email address ",
      });
      return;
    }
    const { userName, _id, password, blockStatus } = result;
    if (password !== req.body.password) {
      console.log("wrong password");
      res.json({ loginStatus: false, message: "Password dosn't match" });
      return;
    }
    if (blockStatus) {
      res.json({
        loginStatus: false,
        message: "Sorry  you are blocked  by the admin ",
      });
      return;
    }

    try {
      res
        .cookie("access-token", createToken(result), {
          maxAge: 60 * 60 * 24 * 30 * 1000,
        })
        .json({ registerStatus: true, username: userName });
    } catch (err) {
      console.log(err.message);
      res.json({ registerStatus: false, message: err.message });
    }
  },
  homePage: (req, res) => {
    res.json({ message: true });
  },

  logout: (req, res) => {
    res.clearCookie("access-token");

    res.json({ status: true, message: "user loged out successfully" });
  },
};
