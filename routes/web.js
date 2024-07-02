const express = require('express');
const router = express.Router();
const app = express();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/siteone', (req, res) => {
  res.sendFile('info.html', { root: 'public/siteone'})
});

router.get('/about', (req, res) => {
  res.sendFile('about.html', { root: 'public/siteone'})
});

router.get('/sitetwo', (req, res) => {
  res.sendFile('info.html', { root: 'public/sitetwo'})
});

router.get('/about', (req, res) => {
  res.sendFile('about.html', { root: 'public/sitetwo'})
});

router.get('/details', (req, res)=>{
  res.sendFile('details.html', { root: 'public'})
});

router.get('/generate/:id', async (req, res) => {
  res.sendFile('generate.html', { root: 'public' });
});

router.get('/upload/:id', async (req, res) => {
  res.sendFile('upload.html', { root: 'public' });
})

module.exports = router;
