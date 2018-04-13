const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // We add a delay just for demo purposes:
    setTimeout(() => res.status(200).json({ message: 'Welcome to Express' }), 1000);
  });
  
module.exports = router;