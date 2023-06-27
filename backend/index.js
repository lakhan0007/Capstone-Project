const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 5000

app.get("/",(req, res) => {
    res.send("SERVER IS RUNNING")
})
app.post("/signup",(req, res) => {
    console.log(req.body);
})

app.listen(PORT,()=> console.log("server is running at port :" + PORT));