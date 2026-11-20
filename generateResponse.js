import OpenAI from 'openai';
import { readFile } from 'node:fs/promises';
import { MODEL, INSTRUCTIONS, buildPrompt } from './config';

const client = new OpenAI();

export default async function generateResponse (imageFile, userText){
  const buffer = await readFile(imageFile.path);
  const base64 = buffer.toString('base64');
  const dataUrl = `data:${imageFile.mimetype};base64,${base64}`;

  const response = await client.responses.create({
    model: MODEL,
    instructions: INSTRUCTIONS,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_image",
            image_url: dataUrl,
            detail: "auto",
          },
          {
            type: "input_text",
            text: buildPrompt(userText),
          },
        ],
      },
    ],
  });

  return response.output_text;
}

