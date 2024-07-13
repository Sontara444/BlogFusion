const express = require("express");
const path = require("path");
const userRoute = require("./routes/user")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthencationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(checkForAuthencationCookie("token"))

mongoose.connect("mongodb://127.0.0.1/blogFusion")
.then((e)=>{console.log("MongoDb Connected")})
.catch((err)=>{console.log("MDB Connection Error", err)})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

// routes 
app.get("/", (req, res)=>{
    res.render("home", {
        user: req.user,
    })

})

app.use("/user", userRoute)

app.listen(PORT, ()=> console.log(`Server Started at PORT : ${PORT} `))