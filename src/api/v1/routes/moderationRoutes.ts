import { Router } from "express";
import {
    moderatePost,
    flagUser,
    getPostById,
    getUserProfile,
    getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();

/**
 * @swagger
 * /moderation/post/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     description: Fetches detailed information about a specific post including its content, author, and moderation status
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the post
 *         example: "12345"
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Post not found"
 *               error: "No post exists with the provided ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Internal server error"
 *               error: "An unexpected error occurred while retrieving the post"
 */
router.get("/post/:id", getPostById);

/**
 * @swagger
 * /moderation/post/{id}/moderate:
 *   post:
 *     summary: Moderate a post by ID
 *     description: Apply moderation action to a specific post, such as flagging, hiding, or removing content that violates community guidelines
 *     tags:
 *       - Moderation Actions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the post to moderate
 *         example: "12345"
 *     responses:
 *       200:
 *         description: Post moderated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post moderated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ModerationAction'
 *       400:
 *         description: Bad request - Invalid post ID or moderation parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Bad request"
 *               error: "Invalid post ID format or missing required parameters"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Post not found"
 *               error: "No post exists with the provided ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Internal server error"
 *               error: "An unexpected error occurred during moderation"
 */
router.post("/post/:id/moderate", moderatePost);

/**
 * @swagger
 * /moderation/user/{id}/profile:
 *   get:
 *     summary: Retrieve user profile by ID
 *     description: Fetches comprehensive user profile information including username, bio, post count, and moderation status
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *         example: "67890"
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "User not found"
 *               error: "No user exists with the provided ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Internal server error"
 *               error: "An unexpected error occurred while retrieving user profile"
 */
router.get("/user/:id/profile", getUserProfile);

/**
 * @swagger
 * /moderation/user/{id}/flag:
 *   post:
 *     summary: Flag a user by ID
 *     description: Report a user for violating community guidelines. The user will be flagged for review by moderators
 *     tags:
 *       - Moderation Actions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user to flag
 *         example: "67890"
 *     requestBody:
 *       description: Reason for flagging the user
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlagUserRequest'
 *           example:
 *             reason: "Spam"
 *     responses:
 *       200:
 *         description: User flagged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User flagged successfully"
 *                 data:
 *                   $ref: '#/components/schemas/FlagUserResponse'
 *       400:
 *         description: Bad request - Invalid user ID or flag reason
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Bad request"
 *               error: "Invalid user ID format or unsupported flag reason"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "User not found"
 *               error: "No user exists with the provided ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Internal server error"
 *               error: "An unexpected error occurred while flagging the user"
 */
router.post("/user/:id/flag", flagUser);

/**
 * @swagger
 * /moderation/content/flags/stats:
 *   get:
 *     summary: Retrieve statistics on flagged content
 *     description: Returns comprehensive statistics about flagged content including total counts, common reasons, and categorized breakdown
 *     tags:
 *       - Statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Flagged content statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Flagged content statistics"
 *                 data:
 *                   $ref: '#/components/schemas/FlaggedContentStats'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Internal server error"
 *               error: "An unexpected error occurred while retrieving statistics"
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;