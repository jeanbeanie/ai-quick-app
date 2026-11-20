import express from 'express';
import multer from 'multer';
import generateResponse from './generateResponse';
import { unlink } from 'node:fs/promises';

const app = express();

// 1. Middleware to parse incoming JSON and form data
//app.use(express.json());

// serve static files from public dir
app.use(express.static('public'));
const upload = multer({dest: 'uploads/'})

app.post('/api/generate-response', upload.single('imageInput'), async (req, res) => {

  if(!req.file) {
    res.status(400).send("Please select an image!");
    return;
  }

  // call openai model with the img and text
  try {
    const text = await generateResponse(req.file, req.body.textInput);
    res.send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong generating the response.');
  } finally {
    await unlink(req.file.path).catch(console.error);
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
});
