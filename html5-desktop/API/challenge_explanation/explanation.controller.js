import * as explanationModel from "./explanation.model.js";
/**
 * The method is used to fetch a challenge and tasks related to this challenge.
 * @param {challengeID} REQUEST
 * @param {*} RESPONSE
 */
export async function fetchIntro(REQUEST, RESPONSE) {
  try {
    let guidance = await explanationModel.getIntro();
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
export async function fetchOutro(REQUEST, RESPONSE) {
  try {
    let guidance = await explanationModel.getOutro();
    RESPONSE.json(guidance);
  } catch (ERROR) {
    RESPONSE.status(500).json({ code: 500, msg: ERROR });
  }
}
