const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const path = require('path');
const DesktopRoutes = require('./routes/DesktopRoutes');

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to MTG CardShop!');
});

app.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'product_images', filename);
  console.log(imagePath);
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Image not found!' });
    }
  });
});

app.use('/desktop', DesktopRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong with the application!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});