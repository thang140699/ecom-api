const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const orderSystem = require("./routes/orderSystemRoute");
const coupon = require("./routes/couponRoute");
const brand = require("./routes/brandRoute");
const banner = require("./routes/bannerRoute");
const feedback = require("./routes/feedbackRoute");
const newFeed = require("./routes/newFeedRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", orderSystem);
app.use("/api/v1", coupon);
app.use("/api/v1", brand);
app.use("/api/v1", banner);
app.use("/api/v1", feedback);
app.use("/api/v1", newFeed);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
