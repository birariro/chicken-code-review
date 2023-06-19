const core = require("@actions/core");
const github = require("@actions/github");
const { Toolkit } = require("actions-toolkit");
const tools = new Toolkit();
const { getReview } = require("../review/review");

async function pullRequest(token, gptKey) {

    try {
        const client = new github.GitHub(token);

        const { GITHUB_REPOSITORY, GITHUB_SHA } = process.env;
        const [owner, repo] = GITHUB_REPOSITORY.split("/");
        const sha = GITHUB_SHA;
        core.info(`GITHUB_REPOSITORY ${GITHUB_REPOSITORY}, GITHUB_SHA ${GITHUB_SHA}`);
        core.info(`repo ${repo}, owner ${owner}, sha ${sha}`);

        const compare = await client.request(`GET /repos/${owner}/${repo}/compare/${sha}^...${sha}`);
        const changes = compare.data.files.map((file) => file.filename);
        core.info(`changes ${changes}`);


        // 변경된 파일과 내용 가져오기
        let fileDiff = ""
        for (const file of changes) {
            const diff = await client.request(`GET /repos/${owner}/${repo}/commits/${sha}`, {
                headers: {
                    Accept: "application/vnd.github.diff",
                },
            });

            core.info(`File ${file}`);
            core.info(`Diff:\n${diff.data}\n`);
            fileDiff += `${diff.data}\n\n`
        }

        let review = await getReview(gptKey,fileDiff);

        const pullRequests = await client.pulls.list({
            owner: owner,
            repo: repo,
            head: sha,
        });
        if (pullRequests.data.length > 0) {
            const pullRequestNumber = pullRequests.data[0].number;
            await client.request(`POST /repos/${owner}/${repo}/issues/${pullRequestNumber}/comments`, {
                body: review,
            });
            core.info('Comment added to the pull request.');
        } else {
            core.info('No pull requests found for the commit.');
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = {
    pullRequest,
};