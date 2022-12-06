/** @format */

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function generateResponse(msg) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${msg}`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  });

  const myResponse = response.data.choices[0].text.replace("\n\n", "");
  return myResponse;
}

module.exports = generateResponse();
