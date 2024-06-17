const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // 환경변수를 로드
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5001; // 포트 설정

app.use(
  cors({
    origin: "*", // 모든 도메인의 접근 허용
  })
);
app.use(express.json()); // JSON 요청 본문 파싱

app.use("/api", taskRoutes);
app.get("/", (req, res) => {
  // 간단한 루트 라우트
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
