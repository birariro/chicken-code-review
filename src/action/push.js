const core = require("@actions/core");

async function push(client, owner, repo, sha, review) {
    try {

        let push_commit_url =`/repos/${owner}/${repo}/commits/${sha}/comments`
        core.info(`push_commit_url: ${push_commit_url}`);

        await client.request(`POST ${push_commit_url}`, {
            body: review,
        });


        core.info(`Comment added to the commit.`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = {
    push,
};