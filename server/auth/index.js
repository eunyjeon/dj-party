const router = require("express").Router();
const User = require("../db/models/user");
module.exports = router;


router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/me", (req, res) => {
  console.log("req.user /me: ", req.user);
  res.json(req.user);
});


router.use("/spotify", require("./spotify"));
