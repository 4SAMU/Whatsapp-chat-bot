/** @format */

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");
// const { querySearch } = require("./query.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

export async function chatWhatsapp() {
  client.on("message", async (message) => {
    let msg = message.body.toLowerCase();
    let sender = message.from;

    if (sender.indexOf("@c.us") !== -1) {
      // const data = await querySearch(msg);
      if (msg) {
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

        client.sendMessage(
          sender,
          response.data.choices[0].text.replace("\n\n", "")
        );
      }
    }
  });

  client.initialize();
}
