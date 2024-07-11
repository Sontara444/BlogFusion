const express = require("express");
const path = require("path");
const userRoute = require("./routes/user")
const mongoose = require("mongoose")

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}))

mongoose.connect("mongodb://127.0.0.1/blogFusion")
.then((e)=>{console.log("MongoDb Connected")})
.catch((err)=>{console.log("MDB Connection Error", err)})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

// routes 
app.get("/", (req, res)=>{
    res.render("home")
})

app.use("/user", userRoute)

app.listen(PORT, ()=> console.log(`Server Started at PORT : ${PORT} `))