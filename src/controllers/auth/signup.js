import { Router } from "express";
import { register } from "../../services/auth/authService.js";
import { encryptPassword } from "../../common/utils/encrypt.js";
import passport from "passport";
const router = Router();

router.post("/signup", (req, res, next) => {
    passport.authenticate('local.signup', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error', error: err.sqlMessage });
        }
        if (!user) {
            return res.status(400).json({ message: 'Signup failed', info });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login failed after signup', error: err });
            }
            return res.status(201).json({ message: 'Signup successful', user });
        });
    })(req, res, next);
});

export default router;