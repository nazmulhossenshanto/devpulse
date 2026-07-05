import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { checkRole } from "../../middlewares/checkRole.js";
import { issueController } from "./issues.controller.js";

const router = Router();
router.post('/', auth, checkRole("contributor", "maintainer"), issueController.createIssue);

router.get('/', issueController.getAllIssues)





export const issueRoutes = router;