require("dotenv").config({path: require("path").resolve(__dirname, "../.env")});
const express = require("express");
const cors = require("cors");
const path = require("path");
const taskRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5001;

console.log("PORT from .env:", PORT);

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
