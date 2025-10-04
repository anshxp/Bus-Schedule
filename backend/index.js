const express=require("express");
const cors = require("cors");
const rateLimit=require('express-rate-limit')
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoSanitize=require('express-mongo-sanitize')
const busrouter =require('./routes/busRoutes.js')
const authRouter = require("./routes/authRoutes.js");
const connectDB = require("./data/init.js");
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/adminRoute.js");
const errorhandler = require("./middlewares/errorhandler.js");
const helmet=require('helmet')
const app=express();
const port=3000;


connectDB();

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
app.use(helmet());
app.use((req, res, next) => {
  req.body = mongoSanitize.sanitize(req.body);
  req.params = mongoSanitize.sanitize(req.params);
  req.query = mongoSanitize.sanitize(req.query);
  next();
});


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: "Too many requests from this IP, please try again later"
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', busrouter);
app.use('/',authRouter);
app.use('/admin',adminRoute);

app.get("/",(req,res)=>{
    res.send("Welcome to the Bus Schedule API");
})
app.use(errorhandler);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
