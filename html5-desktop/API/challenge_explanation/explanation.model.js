import * as fs from "fs";

const Intro = "./db/challenge_Intro.json";
const Outro = "./db/challenge_outro.json";

async function readDB(file) {
  let dbFile = await fs.promises.readFile(file);
  return JSON.parse(dbFile);
}

export async function getIntro() {
  try {
    let db = await readDB(Intro);
    return db;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOutro() {
  try {
    let db = await readDB(Outro);
    return db;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
