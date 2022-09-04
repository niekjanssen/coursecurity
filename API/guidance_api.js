import express from "express";
import cors from "cors";

import { guidanceROUTER } from "./guidance/guidance.route.js";
import { explanationRouter } from "./challenge_explanation/explanation.route.js";

//Create Express application
const APP = express();
const PORT = 5500;

//Automatically parse all incoming JSON payloads
APP.use(express.json());
//Allow Cross-Origin requests
APP.use(cors());

//Default Message when accessing API Root
APP.get("/", (REQUEST, RESPONSE) =>
  RESPONSE.json({ code: 200, msg: "Guidance-API", version: 0.2 })
);

//Load the Routers
APP.use(guidanceROUTER);
APP.use(explanationRouter);
//Handle any request not handled by a router
APP.all("*", (REQUEST, RESPONSE) =>
  RESPONSE.status(404).json({ code: 404, msg: "Endpoint Not Found" })
);

//Make express APP listen on PORT
APP.listen(PORT, function (ERROR) {
  console.log("Server PORT: " + PORT);
  if (ERROR) console.log("ERROR IN SERVER SETUP" + ERROR.msg);
});
