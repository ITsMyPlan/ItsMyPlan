const express = require("express");
const cors = require("cors");
const path = require("path");
const taskRoutes = require("./routes");

require("dotenv").config({path: path.resolve(__dirname, "../.env")});

const app = express();
const PORT = process.env.PORT || 5001;

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
