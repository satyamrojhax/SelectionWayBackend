# SelectionWay Backend API

This is a backend API for SelectionWay that provides endpoints for batches, faculty, classes, topics, and PDFs. The API fetches data from external sources and filters the responses to return only the required fields.

## Installation

```bash
npm install
```

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory:
```
PORT=3001
```

## API Endpoints

### 1. Get All Paid Batches
```
GET /api/batches?status=paid
```
Returns filtered batch data from SelectionWay API with fields: status, id, title, priority, price, discountPrice, isLive, banner, bannerSquare, description, liveClassesCount, courseHighlights, validity, short_description, createdAt, updatedAt

### 2. Get All Active Batches
```
GET /api/batches?type=all
```
Returns all active batches from GD Goenka API with fields: status, id, title, priority, price, discountPrice, isLive, banner, bannerSquare, description, liveClassesCount, courseHighlights, validity, short_description, createdAt, updatedAt, timeTable

### 3. Get Batch Details
```
GET /api/batches?id={batchId}&status=true
```
Returns detailed batch information from GD Goenka API with fields: id, title, banner, bannerSquare, description, liveClassesCount, courseHighlights, validity, createdAt, updatedAt, facultyDetails, demoVideos, introVideo, faqs, faq

### 4. Get Topics for a Batch
```
GET /api/batches?id={batchId}&type=topics&status=true
```
Returns all topics extracted from classes data with fields: id (topicId), topicName, image (fixed URL)

### 5. Get Classes by Topic
```
GET /api/batches?id={batchId}&topic={topicId}&type=classes&status=true
```
Returns filtered classes for a specific topic with fields: id, title, image, classCreatedAt, classUpdatedAt, duration (HH:MM:SS), description, classlink, mp4recordings, classpdfs, Teachername

### 6. Get PDFs by Topic
```
GET /api/batches?id={batchId}&topic={topicId}&type=pdfs&status=true
```
Returns PDF data for classes within a specific topic with fields: id, priority, addedAt, classPdf

### 7. Get All Classes for a Batch
```
GET /api/batches?id={batchId}&type=classes&status=true
```
Returns all classes data from GD Goenka API (unfiltered)

### 8. Get Today's Classes
```
POST /api/batches?id={batchId}&type=today-classes
Content-Type: application/json

{
  "userId": "0"
}
```
Returns today's scheduled classes for the batch

### 9. Get All Faculty
```
GET /api/faculty
```
Returns faculty information

## Deployment

The application is deployed and ready for production use.

## Dependencies

- **express**: Web framework for Node.js
- **axios**: HTTP client for making requests to external APIs
- **dotenv**: Environment variable management

## External APIs

The application integrates with:
- **SelectionWay API**: https://www.selectionway.com
- **GD Goenka API**: https://gdgoenkaratia.com

## Features

- ✅ Filtered API responses returning only required fields
- ✅ Topic-based class and PDF organization
- ✅ Duration formatting (HH:MM:SS)
- ✅ Error handling and validation
- ✅ Environment-based configuration
- ✅ Production deployment ready
