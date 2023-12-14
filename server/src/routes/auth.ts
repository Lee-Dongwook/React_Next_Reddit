import { Request, Response, Router } from 'express';
import { validate } from 'class-validator';
import User from '../entities/User';

const mapError = (errors: Object[]) => {
    return errors.reduce((prev:any, err:any)=> {
        prev[err.property] = Object.entries(err.constraints[0][1]);

        return prev;
    })
}

const register = async (req: Request, res:Response) => {
    const {email, username, password} = req.body;
    
    try {
        let errors: any = {};

        const emailUser = await User.findOneBy({email});
        const usernameUser = await User.findOneBy({username});

        if(emailUser) errors.email = "이미 해당 이메일 주소가 사용되었습니다.";
        if(usernameUser) errors.username = "이미 해당 사용자 이름이 사용되었습니다.";

        const user = new User();
        user.email = email;
        user.username = username;
        user.password = password;

        errors = await validate(user);
        if(errors.length > 0) return res.status(400).json(mapError(errors));

        await user.save();
        return res.json(user);

    } catch(error){
      console.error(error);
      return res.status(500).json({error}); 
    }
}

const router = Router();
router.post("/register", register);

export default router;