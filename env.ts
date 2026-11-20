import 'dotenv/config';

if(!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY. Copy .env.example to .env and add your key.');
  process.exit(1);
}
