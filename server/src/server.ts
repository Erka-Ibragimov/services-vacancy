import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import route from "./routes/route";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/vacancy";

app.use(cors());
app.use(bodyParser.json());

app.use("/api", route);

const startServer = async () => {
  await connectToDatabase(MONGO_URI);
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
};

startServer();
