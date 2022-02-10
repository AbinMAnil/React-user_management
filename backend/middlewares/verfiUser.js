const { verify } = require("jsonwebtoken");
const user = require("../model/userModel");

module.exports = {
  /*
   * @params username , userPassword , userId
   * @return boolen status of vefication
   */
  verifUser: async (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
      return res.status(400).json({ message: " access - token not fount" });
    }

    try {
      if (verify(accessToken, "jwtserect")) {
        const { id } = verify(accessToken, "jwtserect");
        const result = await user.findById(id);
        if (result == null) {
          return res
            .status(400)
            .json({ message: "You are deleted By the admin" });
        }
        if (result.blockStatus) {
          return res
            .status(400)
            .json({ message: "sorry you are blocked by the admin " });
        } else {
          next();
        }
      } else {
        return res.status(400).json({ message: "user is not authenticated " });
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },
};
