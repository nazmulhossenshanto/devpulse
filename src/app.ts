import express, { type Application, type Request, type Response } from "express";
import notFound from "./middlewares/notFound.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { issueRoutes } from "./modules/issues/issues.routes.js";
import cors from "cors";
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response)=>{
    res.status(200).json({
        success: true,
        message: "This is devpulse root route"
    })
});

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);




app.use(notFound);
export default app;