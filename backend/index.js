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
const contactRoutes = require("./routes/contactRoutes.js");
const errorhandler = require("./middlewares/errorhandler.js");
const helmet=require('helmet')
const app=express();
const port=3000;


connectDB();

// Configure CORS to allow local dev, the deployed frontend, and Netlify preview domains.
// We echo the origin when allowed so Access-Control-Allow-Origin matches the requesting origin
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://soft-mermaid-1d6217.netlify.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests (like curl, server-side)
    if (!origin) return callback(null, true);

    // Allow exact matches from the allowedOrigins list
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    // Allow Netlify preview subdomains (e.g. https://<hash>--site.netlify.app)
    if (/\.netlify\.app$/.test(origin)) {
      return callback(null, true);
    }

    // Otherwise reject
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
  credentials: true
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
app.use('/api',contactRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to the Bus Schedule API");
})
app.use(errorhandler);
app.listen(port, () => {
});
