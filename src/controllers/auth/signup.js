import { Router } from "express";
import { register } from "../../services/auth/authService.js";

const router = Router();

router.post("/signup", async(req, res) => {
    try {
       const newUser = await register(req.body);
       if(newUser) res.status(200).json(newUser);
    } catch (error){
        res.status(400).json(error);
    }
})
export default router;