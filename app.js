const express = require("express");
const cors = require("cors");

const app = express();
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({ message: "Welcome to contact book application." });
});

//sử dụng các route được định nghĩa bên trong contact.route nếu đường dẫn 
//bắt đầu  là /api/contacts
app.use("/api/contacts", contactsRouter);

//xử lí lỗi 404
app.use((req, res, next)=>{
    return next(new ApiError(404, "Resource not found"));
});

//Middleware xử lý tập trung, khi các route gọi next(error) thì sẽ chuyển về middleware xử lí lỗi này
app.use( (err, req, res, next)=>{
    res.status(500 || StatusCode).json( {
        message : error.message || "Internal Server Error",
    });
});



module.exports = app;