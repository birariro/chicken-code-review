const { Configuration, OpenAIApi } = require("openai");
const core = require("@actions/core");
const { prompt } = require("./prompt")
async function getReview(key, code, language){

    try{

        let _prompt = prompt(language) + code;
        let _model = "gpt-3.5-turbo";
        let _role = "system";

        core.info(`\n\n`);
        core.info(`===================================`);
        core.info(`model:  ${_model}`);
        core.info(`role :   ${_role}`);
        core.info(`prompt: ${_prompt}`);
        core.info(`===================================`);
        core.info(`\n\n`);
        const conf = new Configuration({
            apiKey:key
        });

        const openai = new OpenAIApi(conf);
        const chatCompletion = await openai.createChatCompletion({
            model: _model,
            messages: [{role: _role, content: _prompt}],
        });

        core.info(`chat completion: ${JSON.stringify(chatCompletion.data)}`);
        const answer = chatCompletion.data.choices[0].message.content;

        core.info(`code review answer: ${answer}`);
        return answer;
    }catch (error){
        if (error.response) {
            core.info(`error.status : ${error.response.status}`)
            core.info(`error.data: ${JSON.stringify(error.response.data)}`)

        }
        core.setFailed(error.message);
    }
}

module.exports = {
    getReview,
};