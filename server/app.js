import { config } from "dotenv";
config();
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import morgon from "morgan";

import userRoutes from "./routes/user.routes.js";
import errMiddleware from "./middlewares/error.middleware.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import miscRoutes from "./routes/miscellaneous.routes.js";

const app = express();

app.use(express.json());
app.use(morgon("dev"));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    exposedHeaders : ["Set-Cookie"]
  })
);

app.use(cookieParser());

app.use("/ping", (req, res) => {
  res.send("Pong");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1", miscRoutes);

app.all("*", (req, res) => {
  res
    .status(404)
    .send(
      '<h1 style=" width:100%; text-align:center;">OOPS!! 404 page not found</h1>'
    );
});

app.use(errMiddleware);

export default app;
