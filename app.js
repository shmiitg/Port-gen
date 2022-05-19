require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const passport = require("passport");

// database config
require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
// Passport config
const passportInit = require("./config/passport");
passportInit(passport);

const authRouter = require("./routes/auth");
const googleAuthRouter = require("./routes/google-auth");
const githubAuthRouter = require("./routes/github-auth");
const userRouter = require("./routes/user");
const developerRouter = require("./routes/developer");

app.use("/api", authRouter);
app.use("/auth", googleAuthRouter);
app.use("/auth", githubAuthRouter);
app.use("/api/user", userRouter);
app.use("/api/portfolio/developer/", developerRouter);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
