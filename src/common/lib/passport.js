import passport from 'passport';
import LocalStrategy from 'passport-local';
import pool from '../database/db.js'; 
import { comparePassword, encryptPassword } from '../utils/encrypt.js';

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    pool.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) return done(err);
        if (!result.length) return done(null, false, { message: 'User not found' });
        if (!comparePassword(password, result[0].password)) return done(null, false, { message: 'Incorrect password' });
        return done(null, result[0]);
    });
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    emailField: 'email',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const hash = encryptPassword(password);
        const newUser = {
            username: username,
            password: hash,
            email: req.body.email
        };
        pool.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [newUser.username, newUser.password, newUser.email], (err, result) => {
            console.log(result);
            if (err) return done(err);
            newUser.id = result.insertId;
            return done(null, newUser);
        });
    } catch (err) {
        console.log(err)
        return done(err);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id || user.ID);
});

passport.deserializeUser(async (id, done) => {
    try {
        const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length > 0) {
            done(null, rows[0]);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err, null);
    }
});

export default passport;
