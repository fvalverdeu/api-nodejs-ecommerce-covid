const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./api/swagger");
require("dotenv").config();

const authRoutes = require("./api/routes/auth");
const userRoutes = require("./api/routes/user");
const categoryRoutes = require("./api/routes/category");
const productRoutes = require("./api/routes/product");
const makerRoutes = require("./api/routes/maker");
const minewRoutes = require("./api/routes/minew");
const loggerRoutes = require("./api/routes/logger");
const preparationRoutes = require("./api/routes/preparation");
const temperatureRoutes = require("./api/routes/temperature");
const calibrationRoutes = require("./api/routes/calibration");
const authRoutesV1 = require("./api/v1/routes/auth");
const usersRoutesV1 = require("./api/v1/routes/user");
const categoriesRoutesV1 = require("./api/v1/routes/category");
const productsRoutesV1 = require("./api/v1/routes/product");
const makersRoutesV1 = require("./api/v1/routes/maker");
const minewsRoutesV1 = require("./api/v1/routes/minew");
const logsRoutesV1 = require("./api/v1/routes/logger");
const preparationsRoutesV1 = require("./api/v1/routes/preparation");
const temperaturesRoutesV1 = require("./api/v1/routes/temperature");
const calibrationsRoutesV1 = require("./api/v1/routes/calibration");

const url =
  "mongodb+srv://newUser:" +
  process.env.MONGO_ATLAS_PW +
  "@cluster0.yg0rr.mongodb.net/e-commerce-covid?retryWrites=true&w=majority";

mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/uploads", express.static("uploads"));
app.use(express.json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/maker", makerRoutes);
app.use("/minew", minewRoutes);
app.use("/logger", loggerRoutes);
app.use("/preparation", preparationRoutes);
app.use("/temperature", temperatureRoutes);
app.use("/calibration", calibrationRoutes);

// Versioned API (v1) with plural resource names
app.use("/api/v1/auth", authRoutesV1);
app.use("/api/v1/users", usersRoutesV1);
app.use("/api/v1/categories", categoriesRoutesV1);
app.use("/api/v1/products", productsRoutesV1);
app.use("/api/v1/makers", makersRoutesV1);
app.use("/api/v1/minews", minewsRoutesV1);
app.use("/api/v1/logs", logsRoutesV1);
app.use("/api/v1/preparations", preparationsRoutesV1);
app.use("/api/v1/temperatures", temperaturesRoutesV1);
app.use("/api/v1/calibrations", calibrationsRoutesV1);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
