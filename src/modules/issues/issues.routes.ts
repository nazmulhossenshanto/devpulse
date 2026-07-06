import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { checkRole } from "../../middlewares/checkRole.js";
import { issueController } from "./issues.controller.js";

const router = Router();
router.post(
  "/",
  auth,
  checkRole("contributor", "maintainer"),
  issueController.createIssue,
);

router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getSingleIssue);
router.patch(
  "/:id",
  auth,
  checkRole("contributor", "maintainer"),
  issueController.updateIssue,
);

router.delete(
  "/:id",
  auth,
  checkRole("maintainer"),
  issueController.deleteIssue,
);

export const issueRoutes = router;
