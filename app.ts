const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 
const fs = require("fs");
const s3upload = require("./s3_create_and_upload_objects.ts");
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('file-to-upload'), (req, res) => {
  s3upload(req.file.originalname, fs.readFileSync(req.file.path));
  res.redirect('/');
});

app.listen(3000);