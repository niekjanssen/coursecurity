import express from "express";
import { fetchIntro, fetchOutro } from "./explanation.controller.js";

export const explanationRouter = express.Router();

explanationRouter.get("/api/explanation/Intro", fetchIntro);
explanationRouter.get("/api/explanation/Outro", fetchOutro);
