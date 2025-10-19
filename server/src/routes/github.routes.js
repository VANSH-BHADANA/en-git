import { Router } from "express";
import {
  getUserInsights,
  getRecommendations,
  getAIInsights,
} from "../controllers/github.controller.js";

const router = Router();

router.get("/insights/:username", getUserInsights);
router.get("/recommendations/:username", getRecommendations);
router.get("/ai-insights/:username", getAIInsights);

export default router;
