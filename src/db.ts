import mysql from "mysql2/promise";

//mysql://ksfb4u87utz58vxkkh6w:pscale_pw_QTSJ0wSus9pcjs3eMKEzi4YQvsYGrQeBUZ6nvRS5GSa@aws.connect.psdb.cloud/homepage?ssl={"rejectUnauthorized":true}

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DATABASE_HOST !== "localhost" ? { rejectUnauthorized: true } : undefined,
});

export default pool;
