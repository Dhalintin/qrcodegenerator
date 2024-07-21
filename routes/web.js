const express = require('express');
const router = express.Router();
const app = express();

router.get('/', (req, res) => {
  res.sendFile('home.html', { root: 'public' });
});

router.get('/siteone', (req, res) => {
  res.sendFile('info.html', { root: 'public/siteone'})
});

router.get('/about/:id', (req, res) => {
  res.sendFile('about.html', { root: 'public/siteone'})
});

router.get('/sitetwo', (req, res) => {
  res.sendFile('info.html', { root: 'public/sitetwo'})
});

router.get('/about/:id', (req, res) => {
  res.sendFile('about.html', { root: 'public/sitetwo'})
});

router.get('/details/:id', (req, res)=>{
  res.sendFile('details.html', { root: 'public'})
});

router.get('/generate/:id', async (req, res) => {
  res.sendFile('generate.html', { root: 'public' });
});

router.get('/upload/:id', async (req, res) => {
  res.sendFile('upload.html', { root: 'public' });
});

router.get('/signup', async (req, res) => {
  res.sendFile('signup.html', { root: 'public' });
});

router.get('/logout', async (req, res) => {
  res.sendFile('logout.html', { root: 'public' });
});

module.exports = router;
