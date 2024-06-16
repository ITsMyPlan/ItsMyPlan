const sqlite3 = require("sqlite3").verbose();

// 데이터베이스 파일 연결
const db = new sqlite3.Database(
  "./mydatabase.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the mydatabase.db database.");
      initializeDB();
    }
  }
);

// 데이터베이스 초기화 함수
function initializeDB() {
  db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    detail TEXT,
    time TEXT NOT NULL
  )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err);
      } else {
        console.log("Tasks table is ready or already exists.");
      }
    }
  );
}

module.exports = db;
