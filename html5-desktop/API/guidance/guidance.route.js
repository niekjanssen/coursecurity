import express from "express";

import {
  getGuidance,
  updateTask,
  getChallenge,
  toggle,
  getStatus,
  setStatus,
} from "./guidance.controller.js";

export const guidanceROUTER = express.Router();

guidanceROUTER.get("/api/guidance", getGuidance);

guidanceROUTER.get("/api/guidance/:updateID", updateTask);
guidanceROUTER.get("/api/toggle/:updateID", toggle);
guidanceROUTER.get("/api/challenge/:challengeID", getChallenge);
guidanceROUTER.get("/api/getActiveChallenge", getStatus);
guidanceROUTER.post("/api/setActiveChallenge", setStatus);
