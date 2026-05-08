import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import contactRouter from "./contact";
import certificatesRouter from "./certificates";
import portfolioRouter from "./portfolio";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(contactRouter);
router.use(certificatesRouter);
router.use(portfolioRouter);
router.use(adminRouter);

export default router;
