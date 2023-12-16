import { Router, type Request, type Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../entities/User";

const createSub = async(req: Request, res: Response) => {
    const { name, title, description } = req.body;

    const token = req.cookies.token;
    if(!token) return next();

    const { username } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOneBy({username});

    if(!user) throw new Error("Unauthenticated");
}


const router = Router();
router.post("/", createSub);

export default router;