// import { Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//   apiKey: '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'
// });

// const openai = new OpenAIApi(configuration);

// export async function sendMsgToOpenAI(message) {
//   const res = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: message,
//     temperature: 0.7,
//     max_tokens: 256,
//     top_p: 1,
//     frequency_penalty: 0,
//   });
//   return res.data.choices[0].text;
// }

// export default configuration;

import openai from 'openai';

// Set your API key
openai.api_key = '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';

export async function sendMsgToOpenAI(message) {
  const res = await openai.Completion.create({
    engine: 'text-davinci-003',
    prompt: message,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
  });
  return res.choices[0].text;
}
