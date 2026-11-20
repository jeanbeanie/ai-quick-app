# AI Quick App

A small web app that sends an image and a short text to an OpenAI vision model and shows the answer on the page. Meant as a starting point you can clone and adapt.

## How it works

1. You pick an image (PNG or JPEG) and type some text in the browser.
2. The page posts both to `POST /api/generate-response`.
3. The server (Express + multer) reads the image, sends it with your text to OpenAI (`gpt-4o-mini`, Responses API), and returns the answer as plain text.
4. The uploaded image is deleted from the server after each request.

## Requirements

- Node.js (developed on v22)
- [pnpm](https://pnpm.io)
- An [OpenAI API key](https://platform.openai.com/api-keys)

## Setup

```sh
pnpm install
cp .env.example .env
```

Open `.env` and set your key:

```
OPENAI_API_KEY=your-key-here
```

## Run

```sh
pnpm dev
```

Then open http://localhost:3000. To use a different port, set `PORT` in `.env`.

## Make it your own

| To change | Edit |
|---|---|
| The model, instructions or prompt sent to OpenAI | `config.ts` |
| How the image and prompt are sent to OpenAI | `generateResponse.js` |
| The API route and upload handling | `server.ts` |
| Page text, layout and styles | `public/index.html` |
| What the page does on submit | `public/script.js` |

## Notes

- Images you upload are sent to OpenAI. Every request is billed to your API key.
- There is no login or rate limit. Uploads are limited to 10 MB, allowed types PNG or JPEG. Add login and rate limiting before putting the app on the public internet.
- Keep your `.env` file private. It is already listed in `.gitignore`.

## License

[ISC](LICENSE)
