import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import generateResponse from './generateResponse';
import { unlink } from 'node:fs/promises';

const app = express();

// 1. Middleware to parse incoming JSON and form data
//app.use(express.json());

// serve static files from public dir
app.use(express.static('public'));

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: MAX_IMAGE_BYTES},
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg'];
    // skip file if its filetype isnt correct
    cb(null, allowed.includes(file.mimetype));
  },
});

app.post('/api/generate-response', upload.single('imageInput'), async (req, res) => {

  if(!req.file) {
    res.status(400).send("Please select a PNG or JPEG image!");
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

// Multer error handling middleware
app.use((err:unknown, _req:Request, res:Response, next:NextFunction) => {
  if(err instanceof multer.MulterError) {
    const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    res.status(status).send(
      err.code === 'LIMIT_FILE_SIZE' ? 'Image is too large (max 10MB).' : 'Invalid upload.'
    );
    return;
  } // pass non-multer errors on to the Express default handler
  next(err);
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
});
