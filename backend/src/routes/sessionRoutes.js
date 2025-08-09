import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getPublishedSessions,
  getMySessions,
  getMySessionById,
  saveDraft,
  publishSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/sessions", getPublishedSessions);

router.get("/my-sessions", authMiddleware, getMySessions);
router.get("/my-sessions/:id", authMiddleware, getMySessionById);
router.post("/my-sessions/save-draft", authMiddleware, saveDraft);
router.post("/my-sessions/publish", authMiddleware, publishSession);

export default router;
