const passport=require('passport');
const User = require('../models/user')


module.exports.user_reg_get = (req, res) => res.render("roote");
module.exports.user_reg_post = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ email, username });
  await User.register(newUser, password);
  res.send(newUser);
};
module.exports.user_login_get = (req, res) => res.render("login");
(module.exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true,
})),
  async (req, res) => {
    res.redirect("/");
  };
