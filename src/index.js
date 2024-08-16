import express from 'express';
import pool from './common/database/db.js';
import router from './controllers/auth/signup.js';
const app = express();

app.set("PORT", 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router); // Auth

app.listen(app.get("PORT"), () => {
    console.log("Server running on port " + app.get("PORT"));
});