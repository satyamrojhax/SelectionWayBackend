const express = require('express');
const axios = require('axios');
const router = express.Router();

const GDGOENKA_BASE_URL = 'https://gdgoenkaratia.com';

router.get('/', async (req, res) => {
  try {
    const { id, status, tab } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'id parameter is required' });
    }

    const response = await axios.post(
      `${GDGOENKA_BASE_URL}/api/courses/by-id-2`,
      { userId: '4151286', id }
    );

    const batchDetail = response.data.data;
    
    let filteredBatch = {};
    
    if (tab === 'overview') {
      filteredBatch = {
        id: batchDetail.id,
        title: batchDetail.title,
        banner: batchDetail.banner,
        bannerSquare: batchDetail.bannerSquare,
        description: batchDetail.description,
        liveClassesCount: batchDetail.liveClassesCount,
        courseHighlights: batchDetail.courseHighlights,
        validity: batchDetail.validity,
        createdAt: batchDetail.createdAt,
        updatedAt: batchDetail.updatedAt,
        facultyDetails: batchDetail.facultyDetails,
        demoVideos: batchDetail.demoVideos,
        introVideo: batchDetail.introVideo,
        faqs: batchDetail.faqs,
        faq: batchDetail.faq
      };
    } else {
      // Default behavior for backward compatibility
      filteredBatch = {
        id: batchDetail.id,
        title: batchDetail.title,
        banner: batchDetail.banner,
        bannerSquare: batchDetail.bannerSquare,
        description: batchDetail.description,
        liveClassesCount: batchDetail.liveClassesCount,
        courseHighlights: batchDetail.courseHighlights,
        validity: batchDetail.validity,
        createdAt: batchDetail.createdAt,
        updatedAt: batchDetail.updatedAt,
        facultyDetails: batchDetail.facultyDetails,
        demoVideos: batchDetail.demoVideos,
        introVideo: batchDetail.introVideo,
        faqs: batchDetail.faqs,
        faq: batchDetail.faq
      };
    }

    return res.json(filteredBatch);
  } catch (error) {
    console.error('Error fetching batch details:', error.message);
    res.status(500).json({ error: 'Failed to fetch batch details' });
  }
});

module.exports = router;
