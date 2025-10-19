import { Router } from "express";
import { getRepositoryInsights } from "../controllers/repository.controller.js";

const router = Router();

router.route("/:owner/:repo").get(getRepositoryInsights);

export default router;
