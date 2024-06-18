const config = require("./config");
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes");
console.log(config);
const app = express();
const PORT = config.PORT || 5001;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Vercel에서 서버 함수를 사용할 수 있도록 내보냅니다.
