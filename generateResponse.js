import OpenAI from 'openai';
import 'dotenv/config';

const client = new OpenAI();

export default async function generateResponse (imageUrl, userText){
  let response;
  try{
    response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_image",
              image_url: imageUrl,
              detail: "auto",
            },
            {
              type: "input_text",
              text: "What do you see in this image? " + userText,
            },
          ],
        },
      ],
    });

    return response.output_text;
  } catch (err) {
    return `failed to generate response with OpenAI: ${err}`
  }
}

