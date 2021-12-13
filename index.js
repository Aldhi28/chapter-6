require("dotenv").config();

const express = require('express');
const userRouter = require("./routes/route");
const sequelize = require('./models/sequelize')
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.set("view engine","ejs");

app.use(userRouter);

sequelize
.authenticate()
.then (() => {
    console.log('connect')
})
.catch((error) => {
    console.log('error')
})

app.use((err, req, res, next) => {
    console.log(err);
    const { message, code = 500, error = "internal server error" } = err;
  
    return res.status(code).json({
      message,
      code,
      error,
    });
  });

app.listen(PORT,() => {
    console.log(`server load with port : ${PORT}`)
});