import OpenAI from 'openai';
import 'dotenv/config';

const client = new OpenAI();

export async function generateResponse (){
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: "Write a random testeroo sentence.",
  })

  console.log(response.output_text);
  return response.output_text;
}

generateResponse();
