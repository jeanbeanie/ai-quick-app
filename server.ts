import express from 'express';
import multer from 'multer';

const app = express();

// 1. Middleware to parse incoming JSON and form data
//app.use(express.json());

// serve static files from public dir
app.use(express.static('public'));
const upload = multer({dest: 'uploads/'})

// TODO handle post method for form 
app.post('/api/generate-response', upload.single('fileUpload'),(req, res) => {
  console.log('request body', req.body);

  res.send('Form received.');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
});
