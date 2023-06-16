const core = require("@actions/core");
const github = require("@actions/github");
const { Toolkit } = require("actions-toolkit");
const tools = new Toolkit();
const { getReview } = require("./review");

async function pullRequest(token, gptKey) {
    try {
        core.info(`start`);

        const client = new github.GitHub(token);


        const { GITHUB_REPOSITORY, GITHUB_SHA } = process.env;
        const [owner, repo] = GITHUB_REPOSITORY.split("/");
        const sha = GITHUB_SHA;
        core.info(`sha ${sha}`);
        core.info(`repo ${repo}`);
        core.info(`owner ${owner}`);
        const compare = await client.request(`GET /repos/${owner}/${repo}/compare/${sha}^...${sha}`);
        const changes = compare.data.files.map((file) => file.filename);
        core.info(`changes ${changes}`);

        // 변경된 파일과 내용 가져오기
        for (const file of changes) {
            const api = `GET /repos/${owner}/${repo}/commits/${sha}`
            core.info(`api ${api}`);
            const diff = await client.request(api, {
                headers: {
                    Accept: "application/vnd.github.diff",
                },
            });

            console.log(`File: ${file.filename}`);
            console.log(`Diff:\n${diff.data}\n`);
        }

        let review = await getReview("");

        await client.repos.createCommitComment({
            owner: owner,
            repo: repo,
            commit_sha: sha,
            body: review
        });

        // 댓글 작성하기
        // const comment = `Changes in this commit:\n${changes.join("\n")}`;
        // await octokit.request(`POST /repos/${owner}/${repo}/commits/${sha}/comments`, {
        //     body: comment,
        // });

        console.log('Comment added to the commit.');

    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = {
    pullRequest,
};