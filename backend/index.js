const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 5000

// Mongodb Connection
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));


// schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        unique : true,
    },
    password: String,
    confirmPassword: String,
    image: String,
})

// Model
const userModel = mongoose.model('User',userSchema)




// API
app.get("/",(req, res) => {
    res.send("SERVER IS RUNNING")
})

// SIGN UP API
app.post("/signup", async (req, res) => {
    // console.log(req.body);
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if(user){
      res.send({ message: "Email id is already register", alert: false });
    }
    await userModel.create(req.body);
    res.send({ message: "Successfully sign up", alert: true });

  });

//   LOGIN API
app.post("/login", (req, res) => {
    // console.log(req.body);
    const { email } = req.body;
    const user = userModel.findOne({ email: email });
    if (user) {
      const dataSend = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      }
      res.send({message: "Login is successfully",alert: true,data: dataSend,});
    }
    res.send({ message: "Email is not available, please sign up",alert: false,});
  });


// SERVER IS RUNNING
app.listen(PORT,()=> console.log("server is running at port :" + PORT));