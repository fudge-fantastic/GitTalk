import { getFullCommitData } from "./github.js";

const commits = await getFullCommitData("https://github.com/fudge-fantastic/Kaizen_CLOSED");
console.log(commits);

