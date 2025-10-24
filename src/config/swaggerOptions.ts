import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Content Moderation Service API',
            version: '1.0.0',
            description: 'API service for content moderation and user management. This API provides endpoints for moderating posts, flagging users, and retrieving content statistics.',
            contact: {
                name: 'API Support',
                email: 'support@contentmoderation.com',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server',
            },
            {
                url: 'https://api.contentmoderation.com/api/v1',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your bearer token in the format: Bearer <token>',
                },
            },
            schemas: {
                Post: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier for the post',
                            example: '12345',
                        },
                        content: {
                            type: 'string',
                            description: 'The actual content of the post',
                            example: 'Sample post content here...',
                        },
                        author: {
                            type: 'string',
                            description: 'Author ID or name',
                            example: 'user_abc123',
                        },
                        isFlagged: {
                            type: 'boolean',
                            description: 'Whether the post has been flagged for moderation',
                            example: false,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when the post was created',
                            example: '2023-10-01T12:34:56Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when the post was last updated',
                            example: '2023-10-02T08:00:00Z',
                        },
                    },
                },
                UserProfile: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier for the user',
                            example: '67890',
                        },
                        username: {
                            type: 'string',
                            description: 'Username of the user',
                            example: 'sampleUser123',
                        },
                        bio: {
                            type: 'string',
                            description: 'User biography or description',
                            example: 'This is a sample bio for the user profile.',
                        },
                        isFlagged: {
                            type: 'boolean',
                            description: 'Whether the user has been flagged',
                            example: false,
                        },
                        joinedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when the user joined',
                            example: '2023-01-15T09:00:00Z',
                        },
                        postsCount: {
                            type: 'number',
                            description: 'Total number of posts by the user',
                            example: 45,
                        },
                    },
                },
                FlaggedContentStats: {
                    type: 'object',
                    properties: {
                        totalFlaggedPosts: {
                            type: 'number',
                            description: 'Total number of flagged posts',
                            example: 120,
                        },
                        totalFlaggedUsers: {
                            type: 'number',
                            description: 'Total number of flagged users',
                            example: 15,
                        },
                        mostCommonFlagReason: {
                            type: 'string',
                            description: 'Most common reason for flagging',
                            example: 'Spam',
                        },
                        flaggedContentByCategory: {
                            type: 'object',
                            properties: {
                                spam: {
                                    type: 'number',
                                    example: 75,
                                },
                                hateSpeech: {
                                    type: 'number',
                                    example: 30,
                                },
                                inappropriateContent: {
                                    type: 'number',
                                    example: 15,
                                },
                            },
                        },
                    },
                },
                ModerationAction: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Post ID that was moderated',
                            example: '12345',
                        },
                        status: {
                            type: 'string',
                            description: 'Current moderation status',
                            example: 'Moderated',
                        },
                        actionTaken: {
                            type: 'string',
                            description: 'Description of the action taken',
                            example: 'Content flagged and hidden',
                        },
                        moderatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when moderation occurred',
                            example: '2023-10-23T14:30:00Z',
                        },
                    },
                },
                FlagUserRequest: {
                    type: 'object',
                    properties: {
                        reason: {
                            type: 'string',
                            description: 'Reason for flagging the user',
                            example: 'Spam',
                            enum: ['Spam', 'Hate Speech', 'Inappropriate Content', 'Harassment', 'Other'],
                        },
                    },
                },
                FlagUserResponse: {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'string',
                            description: 'ID of the flagged user',
                            example: '67890',
                        },
                        reason: {
                            type: 'string',
                            description: 'Reason for flagging',
                            example: 'Spam',
                        },
                        flaggedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when user was flagged',
                            example: '2023-10-23T14:30:00Z',
                        },
                    },
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Success message',
                        },
                        data: {
                            type: 'object',
                            description: 'Response data',
                        },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message',
                            example: 'An error occurred',
                        },
                        error: {
                            type: 'string',
                            description: 'Detailed error information',
                            example: 'Invalid request parameters',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/api/v1/routes/*.ts'],
};