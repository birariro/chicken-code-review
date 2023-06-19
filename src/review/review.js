const { Configuration, OpenAIApi } = require("openai");
const core = require("@actions/core");
const { prompt } = require("./prompt")
async function getReview(key, code){

    try{

        let _prompt = prompt() + code;
        core.info(`_prompt: ${_prompt}`);

        const conf = new Configuration({
            apiKey:key
        });

        const openai = new OpenAIApi(conf);
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: _prompt}],
        });

        core.info(`chatCompletion: ${JSON.stringify(chatCompletion.data)}`);
        return chatCompletion.data.choices[0].message.content
    }catch (error){
        if (error.response) {
            core.info(`error.status : ${error.response.status} error.data: ${error.response.data}`)
        }
        core.setFailed(error.message);
    }
}

module.exports = {
    getReview,
};