import OpenAI from 'openai';
import 'dotenv/config';
import { readFile } from 'node:fs/promises';

const client = new OpenAI();

export default async function generateResponse (imageFile, userText){
  const buffer = await readFile(imageFile.path);
  const base64 = buffer.toString('base64');
  const dataUrl = `data:${imageFile.mimetype};base64,${base64}`;

  const response = await client.responses.create({
    model: "gpt-4o-mini",
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
            text: "What do you see in this image? " + userText,
          },
        ],
      },
    ],
  });

  return response.output_text;
}

