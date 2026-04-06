require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/mongoDbConnection");
const app = express();
const userRoutes = require("./routes/userRoute");
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");
const aiRoutes = require("./routes/aiRoute");
const fileUpload = require("express-fileupload");
const cors = require("cors");


const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// mount route
app.use("/api/v1",userRoutes);
app.use("/api/v1",categoryRoutes);
app.use("/api/v1",productRoutes);
app.use("/api/v1",aiRoutes);


dbConnect();

app.listen(PORT,()=>{
console.log(`Server is successfully running at port number ${PORT}`);
});