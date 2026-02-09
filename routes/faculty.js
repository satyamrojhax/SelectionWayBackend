const express = require('express');
const axios = require('axios');
const router = express.Router();

const GDGOENKA_BASE_URL = 'https://gdgoenkaratia.com';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GDGOENKA_BASE_URL}/api/faculty`);
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching faculty:', error.message);
    res.status(500).json({ error: 'Failed to fetch faculty' });
  }
});

module.exports = router;
