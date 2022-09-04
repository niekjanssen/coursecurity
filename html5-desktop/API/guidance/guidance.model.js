import * as fs from "fs";

const Tasks = "./db/tasks.json";
const Challenges = "./db/challenges.json";
const ChallengeStatus = "./db/challengeStatus.json";

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

export async function getActiveChallenge() {
  try {
    let challengeStatus = await getChallengeStatus();
    return challengeStatus;
  } catch (ERROR) {
    console.log(ERROR);
    return ERROR;
  }
}
export async function setActiveChallenge(status) {
  let holder = status;
  let response = await saveJSON(holder, ChallengeStatus);
  return response;
}

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
async function saveJSON(json, file_to_write) {
  try {
    return await fs.writeFileSync(file_to_write, JSON.stringify(json));
  } catch (ERROR) {
    throw ERROR;
  }
}

function stepToTask(stepID) {
  return stepID.replace(/7837(-[a-z0-9]{4}).*/, `8275$1`);
}

export async function updateStep(stepID) {
  let taskID = stepToTask(stepID);
  try {
    let tasks = await getTasks();

    // Open DB file and parse JSON into an object
    if (tasks[taskID] !== undefined) {
      if (tasks[taskID].steps[stepID] !== undefined) {
        tasks[taskID].steps[stepID].complete =
          !tasks[taskID].steps[stepID].complete; //!tips[challengeID].isCompleted;
      }
      tasks[taskID].complete = Object.values(tasks[taskID].steps).every(
        (step) => step.complete
      );
      //tasks[taskID].complete = true; //!tips[challengeID].isCompleted;
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
function checkCompletness(tasksToCheck) {
  let completed = true;
  Object.entries(tasksToCheck).forEach((task) => {
    if (!task[1].complete) completed = false;
  });
  return completed;
}

async function getChallengesTasks(ChallengeIDSequence) {
  let tasks = await getTasks();
  let challengeTasks = {};
  ChallengeIDSequence.forEach((element) => {
    challengeTasks[element] = tasks[element];
  });

  return challengeTasks;
}

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
