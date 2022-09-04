import * as guidanceMODEL from "./guidance.model.js";

export async function getGuidance(REQUEST, RESPONSE) {
  try {
    let guidance = await guidanceMODEL.getAllTasks();
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
export async function updateTask(REQUEST, RESPONSE) {
  try {
    let guidance = await guidanceMODEL.updateTask(REQUEST.params.updateID);
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
export async function toggle(REQUEST, RESPONSE) {
  try {
    let guidance = await guidanceMODEL.updateStep(REQUEST.params.updateID);
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}

/**
 * The method is used to fetch a challenge and tasks related to this challenge.
 * @param {challengeID} REQUEST
 * @param {*} RESPONSE
 */
export async function getChallenge(REQUEST, RESPONSE) {
  try {
    let guidance = await guidanceMODEL.getChallenge(REQUEST.params.challengeID);
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}

export async function getStatus(REQUEST, RESPONSE) {
  try {
    let challengeStatus = await guidanceMODEL.getActiveChallenge();
    RESPONSE.json(challengeStatus);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}

export async function setStatus(REQUEST, RESPONSE) {
  try {
    let challengeStatus = await guidanceMODEL.setActiveChallenge(REQUEST.body);
    RESPONSE.json(challengeStatus);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
