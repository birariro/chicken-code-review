const core = require("@actions/core");

async function pullRequest(client, owner, repo, sha, review) {

    try {
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