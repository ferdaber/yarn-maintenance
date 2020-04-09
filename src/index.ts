import path from "path";
import fs from "fs";
import { parse } from "@yarnpkg/lockfile";
import { dedupeUp } from "dedupe-up";

const LOCK_FILEPATH = path.resolve("yarn.lock");

function parseLockFile(lockFilePath: string) {
  try {
    return parse(fs.readFileSync(lockFilePath, "utf8")).object;
  } catch (e) {
    console.error("There was an error parsing the lockfile.");
    throw e;
  }
}

let lockFile = parseLockFile(LOCK_FILEPATH);
if (__DEV__) {
  fs.writeFileSync(
    path.resolve("yarn.lockfile.json"),
    JSON.stringify(lockFile, null, 2)
  );
}
lockFile = dedupeUp(lockFile);
