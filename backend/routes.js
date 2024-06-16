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

//test

// 새로운 작업 추가
router.post("/tasks", (req, res) => {
  const { id, title, detail, time } = req.body;
  const sql = `INSERT INTO tasks (id, title, detail, time) VALUES (?, ?, ?, ?)`;

  // 디버그를 위해 SQL 쿼리와 값을 콘솔에 출력
  console.log(`SQL: ${sql}`);
  console.log(`Values: [${id}, ${title}, ${detail}, ${time}]`);

  db.run(sql, [id, title, detail, time], function (err) {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: "Task created", id });
  });
});

// 작업 삭제
router.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM tasks WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Task deleted", id });
  });
});

module.exports = router;
