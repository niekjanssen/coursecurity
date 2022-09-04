/**
 * File is containing functions managing the fetching of Intro and Outro data.
 */
import * as fs from "fs";

const Intro = "./db/challenge_Intro.json"; // Intro DB file
const Outro = "./db/challenge_outro.json"; // Outro DB file

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
