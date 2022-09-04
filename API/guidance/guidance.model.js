/**
 * File is containing functions managing the data manipulation and  fetching of challenge- and guide information.
 */
import * as fs from "fs";

const Tasks = "./db/tasks.json"; // Tasks DB
const Challenges = "./db/challenges.json"; // Challenge DB
const ChallengeStatus = "./db/challengeStatus.json"; // Active Challenge DB

async function getTasks() {
  let dbFile = await fs.promises.readFile(Tasks);
  return JSON.parse(dbFile);
}
async function getChallenges() {
  let dbFile = await fs.promises.readFile(Challenges);
  return JSON.parse(dbFile);
}
async function getChallengeStatus() {
  let dbFile = await fs.promises.readFile(ChallengeStatus);
  return JSON.parse(dbFile);
}

/**
 * Geting the current active challenge from the database
 */
export async function getActiveChallenge() {
  try {
    let challengeStatus = await getChallengeStatus();
    return challengeStatus;
  } catch (ERROR) {
    console.log(ERROR);
    return ERROR;
  }
}
/**
 * Changing the current active challenge in the DB file
 * @param {*} status New Challenge
 * @returns JSON response
 */
export async function setActiveChallenge(status) {
  let holder = status;
  let response = await saveJSON(holder, ChallengeStatus);
  return response;
}
/**
 * Gets all tasks from the DB
 * @returns
 */
export async function getAllTasks() {
  try {
    // Open DB file and parse JSON into an object
    let tips = await getTasks();
    return tips;
  } catch (ERROR) {
    console.log(ERROR);
    return ERROR;
  }
}
/**
 * Saves information to JSON DB files
 * @param {*} json text to save
 * @param {*} file_to_write file to save.
 * @returns  JSON response
 */
async function saveJSON(json, file_to_write) {
  try {
    return await fs.writeFileSync(file_to_write, JSON.stringify(json));
  } catch (ERROR) {
    throw ERROR;
  }
}
/**
 * Convert stepID for corresponding taskID.
 * Is used for changing the completion status of steps.
 * While keeping them assigned to correct taks
 * @param {*} stepID
 * @returns ID
 */
function stepToTask(stepID) {
  return stepID.replace(/7837(-[a-z0-9]{4}).*/, `8275$1`);
}

/**
 * Updates the completions informations of a step
 * @param {*} stepID
 * @returns updated steps.
 */
export async function updateStep(stepID) {
  let taskID = stepToTask(stepID);
  try {
    let tasks = await getTasks();

    // Open DB file and parse JSON into an object
    if (tasks[taskID] !== undefined) {
      if (tasks[taskID].steps[stepID] !== undefined) {
        tasks[taskID].steps[stepID].complete =
          !tasks[taskID].steps[stepID].complete;
      }
      tasks[taskID].complete = Object.values(tasks[taskID].steps).every(
        (step) => step.complete
      );
    }
    await saveJSON(tasks, Tasks);

    return tasks[taskID].steps[stepID];
  } catch (ERROR) {
    console.log(ERROR);
    if (ERROR.code === "ENOENT") {
      throw new Error("No Products DB exists");
    } else throw ERROR;
  }
}

/**
 * Updates the completions of a tasks
 * @param {*} challengeID Challenge ID
 * @returns Tasks
 */
export async function updateTask(challengeID) {
  try {
    let tasks = await getTasks();

    // Open DB file and parse JSON into an object
    if (tasks[challengeID] !== undefined) {
      tasks[challengeID].complete = true; //!tips[challengeID].isCompleted;
    }
    await saveJSON(tasks, Tasks);

    return tasks[challengeID];
  } catch (ERROR) {
    console.log(ERROR);
    if (ERROR.code === "ENOENT") {
      throw new Error("No Products DB exists");
    } else throw ERROR;
  }
}
/**
 * Checks if all tasks in a bundle is completed
 * @param {*} tasksToCheck
 * @returns boolean completed
 */
function checkCompletness(tasksToCheck) {
  let completed = true;
  Object.entries(tasksToCheck).forEach((task) => {
    if (!task[1].complete) completed = false;
  });
  return completed;
}

/**
 * Fetches all tasks associated with the current challenge
 * @param {*} ChallengeIDSequence
 * @returns Tasks of the challenge
 */
async function getChallengesTasks(ChallengeIDSequence) {
  let tasks = await getTasks();
  let challengeTasks = {};
  ChallengeIDSequence.forEach((element) => {
    challengeTasks[element] = tasks[element];
  });

  return challengeTasks;
}
/**
 * Fetches the challenge information appends all tasks for the challenge
 * @param {*} challengeID
 * @returns challenge and tasks beloging to the challenge.
 */
export async function getChallenge(challengeID) {
  try {
    let allChallenges = await getChallenges();
    let challenge = allChallenges[challengeID];
    challenge["tasks"] = await getChallengesTasks(challenge["TaskIDs"]);
    let comp = checkCompletness(challenge["tasks"]);
    allChallenges = await getChallenges();
    challenge.isCompleted = comp;
    allChallenges[challengeID].isCompleted = comp;
    saveJSON(allChallenges, Challenges);
    return challenge;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
