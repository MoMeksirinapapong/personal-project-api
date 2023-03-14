// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

//create server
require("dotenv").config();

//import
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const foodRoute = require("./routes/food-route");
const authenticateMiddleware = require("./middlewares/authenticate");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 500,
    message: { message: "Too many request,Please try again later" },
  })
);
// app.use(helmet());
app.use(cors());
app.use(express.json());

//app.use and notFoundMid
app.use("/auth", authRoute);
app.use("/users", authenticateMiddleware, userRoute);
app.use("/food", authenticateMiddleware, foodRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port:${port}`));
