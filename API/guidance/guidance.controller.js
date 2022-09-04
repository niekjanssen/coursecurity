/**
 * Filed used as controller to provied code responses and calling funtions in model
 */
import * as guidanceMODEL from "./guidance.model.js";

/**
 * Fetches the Guide for a challenge
 * @param {*} REQUEST Doesn't contain data
 * @param {*} RESPONSE JSON response
 */
export async function getGuidance(REQUEST, RESPONSE) {
  try {
    let guidance = await guidanceMODEL.getAllTasks();
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
/**
 * Updates a task with completed and incompleted steps
 * @param {*} REQUEST ID of task
 * @param {*} RESPONSE JSON response
 */
export async function updateTask(REQUEST, RESPONSE) {
  try {
    let guidance = await guidanceMODEL.updateTask(REQUEST.params.updateID);
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
/**
 * Toggle a step and saves it as completed or incompleted when clicked
 * @param {*} REQUEST ID of step
 * @param {*} RESPONSE JSON response
 */
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
 * @param {*} RESPONSE JSON response
 */
export async function getChallenge(REQUEST, RESPONSE) {
  try {
    let guidance = await guidanceMODEL.getChallenge(REQUEST.params.challengeID);
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}

/**
 * Gets the current active challenge for a users.
 * @param {*} REQUEST
 * @param {*} RESPONSE JSON response
 */
export async function getStatus(REQUEST, RESPONSE) {
  try {
    let challengeStatus = await guidanceMODEL.getActiveChallenge();
    RESPONSE.json(challengeStatus);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
/**
 * Sets the active challenge. Is used for switching between challenges.
 * @param {*} REQUEST Body containing Challenge ID
 * @param {*} RESPONSE JSON CODe.
 */
export async function setStatus(REQUEST, RESPONSE) {
  try {
    let challengeStatus = await guidanceMODEL.setActiveChallenge(REQUEST.body);
    RESPONSE.json(challengeStatus);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
