import mysql from 'mysql';
import { configDotenv } from 'dotenv';
import { readFileSync } from 'fs';
configDotenv({ path: ".env"});
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    multipleStatements: true,
    connectionLimit: 10,
    waitForConnections: true,
    queryFormat: function(query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function(txt, key) {
            if (values.hasOwnProperty(key)) {
                return mysql.escape(values[key]);
            }
            return txt;
        });
    }
})
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
export default pool;