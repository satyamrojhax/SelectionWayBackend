const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/batches', require('./routes/batches'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/batches', require('./routes/batch'));

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  const documentation = {
    title: "SelectionWay Backend API Documentation",
    version: "1.0.0",
    description: "Comprehensive API for SelectionWay batches, faculty, classes, and PDFs",
    baseUrl: "https://selectionwaybackend.vercel.app/api",
    endpoints: [
      {
        method: "GET",
        path: "/batches?status=paid",
        description: "Get all paid batches from SelectionWay API",
        parameters: {
          status: {
            type: "query",
            required: true,
            description: "Filter parameter, must be 'paid'",
            example: "paid"
          }
        },
        response: {
          type: "array",
          description: "Array of batch objects with filtered fields",
          fields: [
            "status", "id", "title", "priority", "price", "discountPrice",
            "isLive", "banner", "bannerSquare", "description", 
            "liveClassesCount", "courseHighlights", "validity", 
            "short_description", "createdAt", "updatedAt"
          ]
        },
        example: {
          request: "GET /api/batches?status=paid",
          response: [
            {
              "status": "active",
              "id": "68ef76338b84905b84eebde7",
              "title": "Vocab Mastery VOD Batch",
              "price": 2999,
              "discountPrice": 499
            }
          ]
        }
      },
      {
        method: "GET",
        path: "/batches?type=all",
        description: "Get all active batches from GD Goenka API",
        parameters: {
          type: {
            type: "query",
            required: true,
            description: "Filter parameter, must be 'all'",
            example: "all"
          }
        },
        response: {
          type: "array",
          description: "Array of all active batch objects",
          fields: [
            "status", "id", "title", "priority", "price", "discountPrice",
            "isLive", "banner", "bannerSquare", "description", 
            "liveClassesCount", "courseHighlights", "validity", 
            "short_description", "createdAt", "updatedAt", "timeTable"
          ]
        },
        example: {
          request: "GET /api/batches?type=all",
          response: [
            {
              "status": "active",
              "id": "698481c9fdd21a8a2d18ac5b",
              "title": "Selection Batch-5",
              "priority": 3
            }
          ]
        }
      },
      {
        method: "GET",
        path: "/batches?id={batchId}&status=true",
        description: "Get detailed batch information from GD Goenka API",
        parameters: {
          id: {
            type: "query",
            required: true,
            description: "Batch ID to retrieve details",
            example: "68ef76338b84905b84eebde7"
          },
          status: {
            type: "query",
            required: true,
            description: "Status parameter, must be 'true'",
            example: "true"
          }
        },
        response: {
          type: "object",
          description: "Detailed batch information object",
          fields: [
            "id", "title", "banner", "bannerSquare", "description",
            "liveClassesCount", "courseHighlights", "validity", 
            "createdAt", "updatedAt", "facultyDetails", "demoVideos", 
            "introVideo", "faqs", "faq"
          ]
        },
        example: {
          request: "GET /api/batches?id=68ef76338b84905b84eebde7&status=true",
          response: {
            "id": "68ef76338b84905b84eebde7",
            "title": "Vocab Mastery VOD Batch",
            "facultyDetails": {
              "name": "Aman Sir",
              "designation": "English Teacher"
            }
          }
        }
      },
      {
        method: "GET",
        path: "/batches?id={batchId}&type=topics&status=true",
        description: "Get all topics for a batch from classes data",
        parameters: {
          id: {
            type: "query",
            required: true,
            description: "Batch ID",
            example: "68ef76338b84905b84eebde7"
          },
          type: {
            type: "query",
            required: true,
            description: "Must be 'topics'",
            example: "topics"
          },
          status: {
            type: "query",
            required: true,
            description: "Must be 'true'",
            example: "true"
          }
        },
        response: {
          type: "array",
          description: "Array of topic objects",
          fields: ["id", "topicName", "image"]
        },
        example: {
          request: "GET /api/batches?id=68ef76338b84905b84eebde7&type=topics&status=true",
          response: [
            {
              "id": "68ef96c95f33a20cd505def2",
              "topicName": "Idioms",
              "image": "https://www.selectionway.com/next_images/logo.png"
            }
          ]
        }
      },
      {
        method: "GET",
        path: "/batches?id={batchId}&topic={topicId}&type=classes&status=true",
        description: "Get classes for a specific topic",
        parameters: {
          id: {
            type: "query",
            required: true,
            description: "Batch ID",
            example: "68ef76338b84905b84eebde7"
          },
          topic: {
            type: "query",
            required: true,
            description: "Topic ID to filter classes",
            example: "68ef96c95f33a20cd505def2"
          },
          type: {
            type: "query",
            required: true,
            description: "Must be 'classes'",
            example: "classes"
          },
          status: {
            type: "query",
            required: true,
            description: "Must be 'true'",
            example: "true"
          }
        },
        response: {
          type: "object",
          description: "Classes data grouped by topic",
          fields: ["course", "classes"],
          nestedFields: {
            classes: [
              "topicName", "topicId", "classes"
            ],
            class: [
              "id", "title", "image", "classCreatedAt", "classUpdatedAt",
              "duration", "description", "classlink", "mp4recordings", 
              "classpdfs", "Teachername"
            ]
          }
        },
        example: {
          request: "GET /api/batches?id=68ef76338b84905b84eebde7&topic=68ef96c95f33a20cd505def2&type=classes&status=true",
          response: {
            "data": {
              "course": { "id": "68ef76338b84905b84eebde7" },
              "classes": [{
                "topicName": "Idioms",
                "topicId": "68ef96c95f33a20cd505def2",
                "classes": [
                  {
                    "id": "68f0672e35a531ec8d21973f",
                    "title": "Idioms Lec - 1",
                    "duration": "00:57:00"
                  }
                ]
              }]
            }
          }
        }
      },
      {
        method: "GET",
        path: "/batches?id={batchId}&topic={topicId}&type=pdfs&status=true",
        description: "Get PDFs for classes within a specific topic",
        parameters: {
          id: {
            type: "query",
            required: true,
            description: "Batch ID",
            example: "68ef76338b84905b84eebde7"
          },
          topic: {
            type: "query",
            required: true,
            description: "Topic ID to filter PDFs",
            example: "68ef96c95f33a20cd505def2"
          },
          type: {
            type: "query",
            required: true,
            description: "Must be 'pdfs'",
            example: "pdfs"
          },
          status: {
            type: "query",
            required: true,
            description: "Must be 'true'",
            example: "true"
          }
        },
        response: {
          type: "object",
          description: "PDF data for specific topic",
          fields: ["course", "topicName", "topicId", "pdfs"],
          nestedFields: {
            pdfs: ["id", "priority", "addedAt", "classPdf"]
          }
        },
        example: {
          request: "GET /api/batches?id=68ef76338b84905b84eebde7&topic=68ef96c95f33a20cd505def2&type=pdfs&status=true",
          response: {
            "data": {
              "course": { "id": "68ef76338b84905b84eebde7" },
              "topicName": "Idioms",
              "topicId": "68ef96c95f33a20cd505def2",
              "pdfs": [
                {
                  "id": "68f0672e35a531ec8d21973f",
                  "priority": 1,
                  "addedAt": "2025-10-16T03:31:58.026Z",
                  "classPdf": [
                    {
                      "priority": 1,
                      "name": "LEC-1 CONCISE idioms",
                      "url": "https://selectionwayserver.hranker.com/pdfs/files/1760885076367-LEC-1_CONCISE.pdf"
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      {
        method: "GET",
        path: "/batches?id={batchId}&type=classes&status=true",
        description: "Get all classes for a batch (unfiltered)",
        parameters: {
          id: {
            type: "query",
            required: true,
            description: "Batch ID",
            example: "68ef76338b84905b84eebde7"
          },
          type: {
            type: "query",
            required: true,
            description: "Must be 'classes'",
            example: "classes"
          },
          status: {
            type: "query",
            required: true,
            description: "Must be 'true'",
            example: "true"
          }
        },
        response: {
          type: "object",
          description: "Complete classes data from GD Goenka API",
          fields: ["state", "msg", "data"]
        },
        example: {
          request: "GET /api/batches?id=68ef76338b84905b84eebde7&type=classes&status=true",
          response: {
            "state": 200,
            "msg": "Classes retrieved successfully",
            "data": { "classes": [] }
          }
        }
      },
      {
        method: "POST",
        path: "/batches?id={batchId}&type=today-classes",
        description: "Get today's scheduled classes for a batch",
        parameters: {
          id: {
            type: "query",
            required: true,
            description: "Batch ID",
            example: "68ef76338b84905b84eebde7"
          },
          type: {
            type: "query",
            required: true,
            description: "Must be 'today-classes'",
            example: "today-classes"
          }
        },
        body: {
          type: "object",
          description: "Request body",
          fields: {
            userId: {
              type: "string",
              required: false,
              description: "User ID (defaults to '0')",
              example: "4151286"
            }
          }
        },
        response: {
          type: "object",
          description: "Today's classes data",
          fields: ["state", "msg", "data"]
        },
        example: {
          request: {
            method: "POST",
            url: "/api/batches?id=68ef76338b84905b84eebde7&type=today-classes",
            body: { "userId": "4151286" }
          },
          response: {
            "state": 200,
            "msg": "Todays classes retrieved successfully",
            "data": { "classes": [] }
          }
        }
      },
      {
        method: "GET",
        path: "/faculty",
        description: "Get all faculty information",
        parameters: {},
        response: {
          type: "array",
          description: "Array of faculty objects",
          fields: ["id", "name", "designation", "bio", "imageUrl", "socialLinks", "videoUrl", "experience", "reach", "description"]
        },
        example: {
          request: "GET /api/faculty",
          response: [
            {
              "id": "6864f6802a698face4d45ecd",
              "name": "Gagan Pratap Sir",
              "designation": "Teacher",
              "experience": "7+ Years"
            }
          ]
        }
      }
    ],
    usage: {
      baseUrl: "https://your-domain.com/api",
      authentication: "No authentication required",
      rateLimit: "No rate limiting implemented",
      cors: "CORS not implemented (handled by hosting platform)",
      format: "JSON",
      encoding: "UTF-8"
    },
    notes: [
      "All timestamps are in ISO 8601 format",
      "Duration is formatted as HH:MM:SS",
      "External APIs: SelectionWay (https://www.selectionway.com) and GD Goenka (https://gdgoenkaratia.com)",
      "Error responses follow standard HTTP status codes with JSON error messages",
      "Empty arrays are returned when no data is found"
    ]
  };
  
  res.json(documentation);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
