const express = require('express');
const axios = require('axios');
const router = express.Router();

const SELECTIONWAY_BASE_URL = 'https://www.selectionway.com';
const GDGOENKA_BASE_URL = 'https://gdgoenkaratia.com';

router.get('/', async (req, res) => {
  try {
    const { status, id, type, topic } = req.query;

    if (id && status === 'true') {
      // Handle batch details
      const response = await axios.post(
        `${GDGOENKA_BASE_URL}/api/courses/by-id-2`,
        { userId: '4151286', id }
      );

      const batchDetail = response.data.data;
      
      const filteredBatch = {
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

      return res.json(filteredBatch);
    }

    if (type === 'all') {
      const response = await axios.get(
        `${GDGOENKA_BASE_URL}/api/courses/active?userId=4151286`
      );
      
      const filteredBatches = response.data.data.map(batch => ({
        status: batch.status,
        id: batch.id,
        title: batch.title,
        priority: batch.priority,
        price: batch.price,
        discountPrice: batch.discountPrice,
        isLive: batch.isLive,
        banner: batch.banner,
        bannerSquare: batch.bannerSquare,
        description: batch.description,
        liveClassesCount: batch.liveClassesCount,
        courseHighlights: batch.courseHighlights,
        validity: batch.validity,
        short_description: batch.short_description,
        createdAt: batch.createdAt,
        updatedAt: batch.updatedAt,
        timeTable: batch.timeTable || []
      }));
      
      return res.json(filteredBatches);
    }

    if (status === 'paid') {
      const response = await axios.get(
        `${SELECTIONWAY_BASE_URL}/_next/data/4nTxWdItRV9RICli72Xx8/en-US/batches/live.json?slug=live`
      );
      
      const filteredBatches = response.data.pageProps.allBatches.map(batch => ({
        status: batch.status,
        id: batch.id,
        title: batch.title,
        priority: batch.priority,
        price: batch.price,
        discountPrice: batch.discountPrice,
        isLive: batch.isLive,
        banner: batch.banner,
        bannerSquare: batch.bannerSquare,
        description: batch.description,
        liveClassesCount: batch.liveClassesCount,
        courseHighlights: batch.courseHighlights,
        validity: batch.validity,
        short_description: batch.short_description,
        createdAt: batch.createdAt,
        updatedAt: batch.updatedAt
      }));
      
      return res.json(filteredBatches);
    }

    if (id && type === 'classes' && status === 'true' && topic) {
      const response = await axios.get(
        `${GDGOENKA_BASE_URL}/api/courses/${id}/classes?populate=full`
      );
      
      const filteredTopic = response.data.data.classes.find(
        topicData => topicData.topicId === topic
      );
      
      if (!filteredTopic) {
        return res.status(404).json({ error: 'Topic not found' });
      }
      
      const classesData = filteredTopic.classes.map(cls => {
        // Calculate duration in HH:MM:SS format
        const durationInSeconds = cls.duration || 0;
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        return {
          id: cls._id,
          title: cls.title,
          image: "https://www.selectionway.com/next_images/logo.png",
          classCreatedAt: cls.classCreatedAt,
          classUpdatedAt: cls.classUpdatedAt,
          duration: formattedDuration,
          description: cls.description,
          classlink: cls.class_link,
          mp4recordings: cls.mp4Recordings || [],
          classpdfs: cls.classPdf || [],
          Teachername: cls.teacherName
        };
      });
      
      return res.json({
        state: 200,
        msg: 'Classes retrieved and grouped by topic successfully',
        data: {
          course: response.data.data.course,
          classes: [{
            topicName: filteredTopic.topicName,
            topicId: filteredTopic.topicId,
            classes: classesData
          }]
        }
      });
    }

    if (id && type === 'pdfs' && status === 'true' && topic) {
      const response = await axios.get(
        `${GDGOENKA_BASE_URL}/api/courses/${id}/classes?populate=full`
      );
      
      const filteredTopic = response.data.data.classes.find(
        topicData => topicData.topicId === topic
      );
      
      if (!filteredTopic) {
        return res.status(404).json({ error: 'Topic not found' });
      }
      
      const pdfsData = filteredTopic.classes.map(cls => ({
        id: cls._id,
        priority: cls.priority,
        addedAt: cls.addedAt,
        classPdf: cls.classPdf || []
      }));
      
      return res.json({
        state: 200,
        msg: 'PDFs retrieved successfully',
        data: {
          course: response.data.data.course,
          topicName: filteredTopic.topicName,
          topicId: filteredTopic.topicId,
          pdfs: pdfsData
        }
      });
    }

    if (id && type === 'classes' && status === 'true') {
      const response = await axios.get(
        `${GDGOENKA_BASE_URL}/api/courses/${id}/classes?populate=full`
      );
      return res.json(response.data);
    }

    if (id && type === 'topics' && status === 'true') {
      const response = await axios.get(
        `${GDGOENKA_BASE_URL}/api/courses/${id}/classes?populate=full`
      );
      
      const topics = response.data.data.classes.map(topic => ({
        id: topic.topicId,
        topicName: topic.topicName,
        image: "https://www.selectionway.com/next_images/logo.png"
      }));
      
      return res.json(topics);
    }

    if (id && type === 'pdfs' && status === 'true') {
      const response = await axios.get(
        `${GDGOENKA_BASE_URL}/api/courses/${id}/pdfs?groupBy=topic`
      );
      return res.json(response.data);
    }

    res.status(400).json({ error: 'Invalid parameters' });
  } catch (error) {
    console.error('Error fetching batches:', error.message);
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
});

router.get('/batch', async (req, res) => {
  try {
    const { id, status } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'id parameter is required' });
    }

    const response = await axios.get(
      `${SELECTIONWAY_BASE_URL}/_next/data/4nTxWdItRV9RICli72Xx8/en-US/batches/ssc-mains-batch/${id}.json?slug=ssc-mains-batch&id=${id}`
    );

    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching batch details:', error.message);
    res.status(500).json({ error: 'Failed to fetch batch details' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id, type } = req.query;

    if (type === 'today-classes' && id) {
      const { userId } = req.body;
      const response = await axios.post(
        `${GDGOENKA_BASE_URL}/api/courses/${id}/todays-classes`,
        { userId: userId || '0', id }
      );
      return res.json(response.data);
    }

    res.status(400).json({ error: 'Invalid parameters' });
  } catch (error) {
    console.error('Error processing batch request:', error.message);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;
