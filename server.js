import cors from 'cors';
import express from 'express';

import 'dotenv/config';

const app = express();
const { PORT } = process.env;
const port = PORT || 8080

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
});