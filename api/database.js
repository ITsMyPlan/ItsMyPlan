require("dotenv").config({path: require("path").resolve(__dirname, "../.env")});
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const DATABASE_URL = process.env.DATABASE_URL;

console.log("DATABASE_URL from .env:", DATABASE_URL);

if (!DATABASE_URL) {
	console.error("DATABASE_URL is not defined");
	process.exit(1);
}

const dbPath = path.join(__dirname, DATABASE_URL); // 수정된 부분
console.log("Resolved database path:", dbPath);

// 데이터베이스 파일 연결
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
	if (err) {
		console.error("SQLITE_CANTOPEN error: ", err.message);
	} else {
		console.log("Connected to the database.");
	}
});

// 테이블 생성
db.run(
	`CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY, 
  title TEXT NOT NULL,
  detail TEXT,
  time TEXT NOT NULL
)`,
	(err) => {
		if (err) {
			console.error(err.message);
		}
	}
);

module.exports = db;
