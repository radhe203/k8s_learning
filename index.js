import express from "express";
import cors from "cors";
import Email from "./models/email.js";
import dbConnect from "./db/db.js";
import path from "path";
import { errorMonitor } from "events";
const app = express();

dbConnect();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.get("/email", async (req, res) => {
  try {
    const email = await Email.find();
    res.status(200).json(email);
  } catch (error) {
    next(error);
  }
});

app.get("/hello", async (req, res) => {
  res.status(200).send("Hello i am hello");
});

app.post("/", async (req, res) => {
  const { email } = req.body;

  if (email == "" && email == !string) {
    return res.status(401).json("Please enter a valid email");
  }

  try {
    const existEmail = await Email.findOne({ email });

    if (existEmail) {
      return res.status(422).json("Email already exist try with another one");
    }

    await Email.create({
      email,
    });

    res.status(200).json("Thank you for subscribing the service");
  } catch (error) {
    next(error);
  }
});

app.post("/edit", async (req, res) => {
  const { email, editable } = req.body;
  console.log(email, editable);
  if (email == "" && email == !string) {
    return res.status(401).json("Please enter a valid email");
  }

  try {
    const existEmail = await Email.findOne({ email });

    if (existEmail) {
      return res.status(422).json("Email already exist try with another one");
    }

    await Email.findOneAndUpdate(
      { email: editable },
      {
        $set: {
          email,
        },
      }
    );

    res.status(200).json("Updated Successfully");
  } catch (error) {
    next(error);
  }
});

app.post("/delete", async (req, res) => {
  const { email } = req.body;

  if (email == "" && email == !string) {
    return res.status(401).json("Please enter a valid email");
  }

  try {
    await Email.findOneAndDelete({ email });
    res.status(200).json("deleted Successfully");
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Intrernal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on port 3000");
  }
});
