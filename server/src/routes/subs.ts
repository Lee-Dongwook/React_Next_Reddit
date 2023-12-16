import { Router, type Request, type Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../entities/User";
import authMiddleware from '../middlewares/auth';
import userMiddleware from '../middlewares/user';

const createSub = async(req: Request, res: Response) => {
    const { name, title, description } = req.body;
}

const router = Router();
router.post("/", userMiddleware, authMiddleware, createSub);

export default router;