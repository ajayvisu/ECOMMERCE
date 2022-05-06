const express           = require("express");
const app               = express();
const mongoose          = require("mongoose");
const dotenv            = require("dotenv");

const userRouter        = require("./routes/user.route");
const authRouter        = require("./routes/auth.route");
const productRouter     = require("./routes/product.route");
const cartRouter        = require("./routes/cart.route");

dotenv.config();

app.listen(process.env.PORT || 6000, ()=>{
    console.log("backend server running successfully!");
});

mongoose.connect(process.env.DB_URL, {useNewUrlParser : true, useUnifiedTopology : true})
        .then(()=>{console.log("DB connected successfully!");})
        .catch((err)=>{console.log(err.message);});

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);


 

