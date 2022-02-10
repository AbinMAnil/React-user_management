module.exports = {
  /*
   *@params  all data form form
   */
  checkAllField: (req, res, next) => {
    const { userName, password, email } = req.body;
    if ((!userName || !password, !email)) {
      res.json({
        registerStatus: false,
        message: "userName , email  and password  id mandatory  ",
      });
      return;
    }
    next();
  },
};
