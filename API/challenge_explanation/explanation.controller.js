/**
 * Filed used as controller to provied code responses and calling funtions in model
 */

import * as explanationModel from "./explanation.model.js";
/**
 * Fetches the Intro for a challenge
 * @param {*} REQUEST - Not used
 * @param {*} RESPONSE - JSON response
 */
export async function fetchIntro(REQUEST, RESPONSE) {
  try {
    let guidance = await explanationModel.getIntro();
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
/**
 * Fetches the Outro for a challenge
 * @param {*} REQUEST - Not used
 * @param {*} RESPONSE - JSON response
 */
export async function fetchOutro(REQUEST, RESPONSE) {
  try {
    let guidance = await explanationModel.getOutro();
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
