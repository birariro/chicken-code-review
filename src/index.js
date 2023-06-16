
const { pullRequest } = require("./action");
const core = require("@actions/core");
async function run() {
  try {
    core.info(`start`);
    const token = core.getInput("github-token");
    const gptKey = core.getInput("gpt-key");

    core.info(`token ${token}`);
    core.info(`gptKey ${gptKey}`);
    if(token == undefined || token == ""){
      core.setFailed("token undefined");
    }
    if(gptKey == undefined || gptKey == ""){
      core.setFailed("chat-GPT key undefined");
    }

    await pullRequest(token, gptKey)



  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
