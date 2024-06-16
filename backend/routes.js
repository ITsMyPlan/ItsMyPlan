const express = require("express");
const db = require("./database"); // 데이터베이스 설정 불러오기
const router = express.Router();

// 모든 데이터 조회
router.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// 새로운 작업 추가
router.post("/tasks", (req, res) => {
  const { title, detail, time } = req.body;
  const sql = `INSERT INTO tasks (title, detail, time) VALUES (?, ?, ?)`;
  db.run(sql, [title, detail, time], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: "Task created", id: this.lastID });
  });
});

module.exports = router;
