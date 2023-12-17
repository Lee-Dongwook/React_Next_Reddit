import { Router, type Request, type Response } from "express";
import userMiddleware from '../middlewares/user';
import User from "../entities/User";
import Post from "../entities/Post";
import Comment from "../entities/Comment";

const getUserData = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneOrFail({
            where: {username: req.params.username},
            select: ["username", "createdAt"]
        })

        const posts = await Post.find({
            where: {username: user.username},
            relations: ["comments", "votes", "sub"]
        })

        const comments = await Comment.find({
            where: {username: user.username},
            relations: ["posts"]
        })

        if(res.locals.user) {
            const { user } = res.locals;
            posts.forEach((post) => post.setUserVote(user));
            comments.forEach((comment) => comment.setUserVote(user));
        }

        let userData: any[] = [];

        posts.forEach((post) => userData.push({type: "Post", ...post.toJson()}));
        comments.forEach((comment) => userData.push({type: "Comment", ...comment.toJson()}));

        userData.sort((a,b) => {
            if(b.createdAt > a.createdAt) return 1;
            if(b.createdAt < a.createdAt) return -1;
            return 0;
        })

        return res.json({user, userData});

    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "문제가 발생했습니다."});
    }
}

const router = Router();
router.get("/:username", userMiddleware, getUserData);
export default router;