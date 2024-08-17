import express from 'express';
import pool from './common/database/db.js';
import router from './controllers/auth/signup.js';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import './common/lib/passport.js';
import passport from 'passport';
import router1 from './controllers/auth/signin.js';
// Inicializa el store para sesiones MySQL
const MySQLStore = MySQLStoreFactory(session);

const app = express();

app.set("PORT", 3000);

// Configuración de la sesión
const sessionStore = new MySQLStore({}, pool);
app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: false } 
}));

// Middleware para analizar JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(router1)
app.listen(app.get("PORT"), () => {
    console.log("Server running on port " + app.get("PORT"));
});
