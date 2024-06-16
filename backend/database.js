const sqlite3 = require("sqlite3").verbose();

// 데이터베이스 파일 연결
const db = new sqlite3.Database(
  "./mydatabase.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the mydatabase.db database.");
  }
);

// 기존 테이블 삭제
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