const express           = require("express");
const cors              = require("cors");
const mongoose          = require("mongoose");
const dotenv            = require("dotenv");
const morgan            = require("morgan");

const userRouter        = require("./routes/user.route");
const authRouter        = require("./routes/auth.route");
const productRouter     = require("./routes/product.route");
const cartRouter        = require("./routes/cart.route");

const app = express();
require('dotenv').config();

app.listen(process.env.PORT || 8000, ()=>{
    console.log("backend server running successfully! on port 8000");
});

mongoose.connect(process.env.DB_URL, {useNewUrlParser : true, useUnifiedTopology : true})
        .then(()=>{console.log("DB connected successfully!");})
        .catch((err)=>{console.log(err.message);
});

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);


 

