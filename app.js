require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://testUser:testUser@cluster0.u1fbuau.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
//mongodb://127.0.0.1:27017/${process.env.DB_NAME}
//mongodb+srv://testUser:testUser@cluster0.u1fbuau.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority

app.use(express.json());

const permitRoute = require("./routers/permit");
const roleRoute = require("./routers/role");
const userRoute = require("./routers/user");

app.use("/permit", permitRoute);
app.use("/role", roleRoute);
app.use("/user", userRoute);


app.use("*", (req, res, next) => {
    next(new Error("Not Route found!"));
})
app.use((err, req, res, next) => {
    err.status = err.status || 200;
    res.status(err.status).json({
        cons: false,
        msg: err.message
    })
})

const defaultData = async () => {
    let migrator = require("./migration/migrator");
    await migrator.migrate();
    // await migrator.backUp();
}
// defaultData();





app.listen(process.env.PORT, console.log(`Server is running at port ${process.env.PORT}`));