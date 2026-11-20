import express from 'express';
import multer from 'multer';
import generateResponse from './generateResponse';

const app = express();

// 1. Middleware to parse incoming JSON and form data
//app.use(express.json());

// serve static files from public dir
app.use(express.static('public'));
const upload = multer({dest: 'uploads/'})

app.post('/api/generate-response', upload.single('imageInput'), async (req, res) => {
  console.log('request body', req.body, 'request file', req.file);

  // call openai model with the img and text
  const response = await generateResponse(req.file, req.body.textInput);

  // return the model's result as JSON
  res.send(`Response from OpenAI: ${response}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
});
