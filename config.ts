// Everything that changes from one app to the next lives in this file.

export const MODEL = 'gpt-4o-mini';

// The assistant's overall role. Sent as the system-level instructions.
export const INSTRUCTIONS = 'You are a helpful assistant that answers questions about images.';

// Turns the text the user typed into the text sent along with the image.
export function buildPrompt(userText = ''): string {
  return `What do you see in this image? ${userText}`.trim();
}
