const { Configuration, OpenAIApi } = require("openai");
const core = require("@actions/core");
async function getReview(key, question){
    try{

        const conf = new Configuration({
            apiKey:key
        });
        const openai = new OpenAIApi(conf);
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: question}],
        });
        core.info(`chatCompletion.data: ${JSON.stringify(chatCompletion.data)}`);
        core.info(`content: ${chatCompletion.data.choices[0].message.content}`);

        return chatCompletion.data.choices[0].message.content
    }catch (error){
        if (error.response) {
            core.info(`error.response.status : ${error.response.status}`)
            core.info(`error.response.data : ${error.response.data}`)
        }
        core.setFailed(error.message);
    }

}
module.exports = {
    getReview,
};