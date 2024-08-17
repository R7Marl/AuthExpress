import mysql from 'mysql';
import { configDotenv } from 'dotenv';
import { readFileSync } from 'fs';
import { promisify } from 'util';
configDotenv({ path: ".env"});
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    multipleStatements: true,
    connectionLimit: 10,
    waitForConnections: true,
    queryFormat: (query, values) => {
        if (!values) return query
        return mysql.format(query, values)
    }
})//
console.log("Conectando a la base de datos...")

pool.getConnection((err, connection) => {
    if(err) throw err;
    if(connection) connection.release();
    if(process.env.PRODUCTION == "false") {
        const sql = readFileSync(`src/common/sql/users.sql`, 'utf8');
        pool.query(sql, (err, result) => {
            if(err) throw err;
            console.log("[DATABASE] Tabla de usuarios creada.");
        })
    }
    console.log("[DATABASE] Conectado a la base de datos");
})

//pool.query = promisify(pool.query);
export default pool;