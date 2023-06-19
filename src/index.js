
const { push } = require("./action/push");
const { pullRequest } = require("./action/pullRequest");
const core = require("@actions/core");
async function run() {
  try {

    const token = core.getInput("github-token");
    const gptKey = core.getInput("gpt-key");
    const trigger = core.getInput("trigger");

    if(token == undefined || token == ""){
      core.setFailed("token undefined");
    }
    if(gptKey == undefined || gptKey == ""){
      core.setFailed("chat-GPT key undefined");
    }
    if(trigger == "PUSH"){
      await push(token, gptKey)
    }
    else if(trigger == "PR"){
      await pullRequest(token, gptKey)
    }



  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
