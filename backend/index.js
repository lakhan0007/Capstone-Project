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
app.post("/signup", async (req, res) => {
    // console.log(req.body);
    const { email } = req.body;
  
    userModel.findOne({ email: email }, (err, result) => {
      // console.log(result);
      console.log(err);
      if (result) {
        res.send({ message: "Email id is already register", alert: false });
      } else {
        const data = userModel(req.body);
        const save = data.save();
        res.send({ message: "Successfully sign up", alert: true });
      }
    });
  });



// SERVER IS RUNNING
app.listen(PORT,()=> console.log("server is running at port :" + PORT));