
const { push } = require("./action/push");
const { pullRequest } = require("./action/pullRequest");
const{ getReview } = require("./review/review")

const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {

    const token = core.getInput("github-token");
    const gptKey = core.getInput("gpt-key");
    const trigger = core.getInput("trigger");
    const language = core.getInput("language");

    if((token == undefined || token == "") || (gptKey == undefined || gptKey == "")){
      core.setFailed("token undefined");
    }

    const client = new github.GitHub(token);

    const { GITHUB_REPOSITORY, GITHUB_SHA } = process.env;
    const [owner, repo] = GITHUB_REPOSITORY.split("/");
    const sha = GITHUB_SHA;
    ;

    const compare = await client.request(`GET /repos/${owner}/${repo}/compare/${sha}^...${sha}`);
    const changes = compare.data.files.map((file) => file.filename);

    core.info(`\n\n`);
    core.info(`===================================`);
    core.info(`GITHUB_REPOSITORY ${GITHUB_REPOSITORY}, GITHUB_SHA ${GITHUB_SHA}`);
    core.info(`repo ${repo}, owner ${owner}, sha ${sha}`)
    core.info(`change file names: ${changes}`);
    core.info(`===================================`);
    core.info(`\n\n`);


    // 변경된 파일과 내용 가져오기
    const diff = await client.request(`GET /repos/${owner}/${repo}/commits/${sha}`, {
      headers: {
        Accept: "application/vnd.github.diff",
      },
    });

    let fileDiff = `\n\n${diff.data}\n\n`

    let review = await getReview(gptKey,fileDiff,language);

    if(trigger == "PUSH"){
      await push(client, owner, repo, sha, review)
    }
    else if(trigger == "PR"){
      await pullRequest(client, owner, repo, sha, review)
    }


  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
