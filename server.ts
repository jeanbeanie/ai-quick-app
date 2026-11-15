import express from 'express';

const app = express();

// serve static files from public dir
app.use(express.static('public'));


// TODO handle post method for form 

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
});
