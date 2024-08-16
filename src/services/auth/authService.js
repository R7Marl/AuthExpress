import pool from "../../common/database/db.js";

export const register = (user) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO users (username, password, email) VALUES (:username, :password, :email)`, user, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}