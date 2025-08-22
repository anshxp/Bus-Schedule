const express=require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app=express();
const port=3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/bus', require('./routes/busRoutes.js'));

app.get("/",(req,res)=>{
    res.send("Welcome to the Bus Schedule API");
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});