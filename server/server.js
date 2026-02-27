require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/mongoDbConnection");
const app = express();
const userRoute = require("./routes/userRoute");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// mount route
app.use("/api/v1",userRoute);

dbConnect();

app.listen(PORT,()=>{
console.log(`Server is successfully running at port number ${PORT}`);
});