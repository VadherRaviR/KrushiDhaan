require("dotenv").config();
const express = require("express");
const app = express();
const { default: axios } = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const methodOverride = require('method-override');
const path = require("path");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session");


// Models
const User = require("./models/user");
const Farmer = require("./models/Farmer");
const Crop = require("./models/Crops");

//DB connection
main2()
  .then((res) => {
    console.log("DB connect successfully...");
  })
  .catch((err) => {
    console.log(err);
  });
async function main2() {
  mongoose.connect("mongodb://127.0.0.1:27017/Farmers");
}

const expressHandler = require("./utils/expressHendler");

// App Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session Config
const sessionOptions = {
  secret: "farmersTradeO",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom Middleware
// app.use((req, res, next) => {
//   res.locals.curruser = req.user;
//   next();
// });

const categoryRoutes = require("./routes/register_categoryRoutes");
const cropRoutes = require("./routes/cropRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const marketRoutes = require("./routes/marketRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const rootRoutes = require("./routes/rootRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/", rootRoutes);
app.use("/register", categoryRoutes);
app.use("/crops", cropRoutes);
app.use("/farmers", farmerRoutes);
app.use("/market", marketRoutes);
app.use("/payment", paymentRoutes);
app.use("/users", userRoutes);

// Error Handling
app.all("*", (req, res, next) => {
  const err = new expressHandler(404, "page not found");
  next(err);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.render("error",  err );
});

// Start Server
app.listen(8080, () => console.log("Server is listening on port 8080"));
