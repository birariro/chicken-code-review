const core = require("@actions/core");

async function push(client, owner, repo, sha, review) {
    try {
        await client.request(`POST /repos/${owner}/${repo}/commits/${sha}/comments`, {
            body: review,
        });
        console.log('Comment added to the commit.');

    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = {
    push,
};