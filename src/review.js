const { Configuration, OpenAIApi } = require("openai");
const core = require("@actions/core");
async function getReview(key, question){
    try{

        let prompt = addPrompt(question);

        const conf = new Configuration({
            apiKey:key
        });

        const openai = new OpenAIApi(conf);
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
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

function addPrompt(code){

    let prompt = "You're a software professional reviewing a colleague's code. \n"
    prompt += "Reviews are made with changes from Git \n"
    prompt += "Review the code to make sure it's readable and that responsibilities and roles are well-divided, and if it's not, give us your tips and tricks. \n"

    prompt += code
    return prompt
}
module.exports = {
    getReview,
};