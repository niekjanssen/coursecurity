/**
 * File is used to manage to different routes and to assign functions and calls to specific routes
 */

import express from "express";
import { fetchIntro, fetchOutro } from "./explanation.controller.js";

export const explanationRouter = express.Router();

explanationRouter.get("/api/explanation/Intro", fetchIntro);
explanationRouter.get("/api/explanation/Outro", fetchOutro);
