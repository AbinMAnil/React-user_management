const { verify } = require("jsonwebtoken");

module.exports = {
  /*
   * @params username , userPassword , userId
   * @return boolen status of vefication
   */
  verifyAdminToken: async (req, res, next) => {
    const accessToken = req.cookies["admin-access-token"];

    if (!accessToken)
      return res.status(400).json({ message: "admin is not authenticated " });

    try {
      if (verify(accessToken, "jwtAdminSecrect")) {
        next();
      } else {
        res.status(400).json({ message: "admin is not authenticated " });
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },
};
