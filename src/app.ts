import express, { Request, Response } from "express";
import {
  deadLetterQueues,
  emailQueue,
  highPriorityEmailQueue,
} from "./utils/listOfQueue";
import EmailSenderUseCase from "./api/emailNotification/EmailSenderUseCase";
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");
require("./processor/index.js"); // processor file

const app = express();
const port = 3000;

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/bull_dashboard");

createBullBoard({
  queues: [
    new BullAdapter(emailQueue),
    new BullAdapter(deadLetterQueues),
    new BullAdapter(highPriorityEmailQueue),
  ],
  serverAdapter: serverAdapter,
});

// bull-ui set_up
app.use("/bull_dashboard", serverAdapter.getRouter());

app.get("/", (req, res) => {
  res.send(`Hello, app running at port :: ${port}`);
});

app.get("/sendEmail", async (request: Request, response: Response) => {
  const useCase = EmailSenderUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(
    `Bull-ui(queue data ) is  running on http://localhost:${port}/bull_dashboard`
  );
});
