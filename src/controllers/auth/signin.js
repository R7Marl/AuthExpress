import { Router } from "express";
import passport from "passport";
import { createToken } from "../../common/utils/secretToken.js";

const router1 = Router();

router1.post("/signin", (req, res, next) => {
    passport.authenticate('local.signin', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error', error: err.sqlMessage });
        }
        if (!user) {
            return res.status(400).json({ message: 'Signin failed', info });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login failed after signin', error: err });
            }
            user.token = createToken({
                id: user.id,
                email: user.email,
                username: user.username
            })
            return res.status(200).json({ message: 'Signin successful', user });
        });
    })(req, res, next);
})

export default router1