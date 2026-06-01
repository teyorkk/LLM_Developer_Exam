require("dotenv").config();

const express = require("express");
const cors = require("cors");

const prisma = require("./lib/prisma");
const authRoutes = require("./routes/auth");
const diaryRoutes = require("./routes/diaries");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.locals.prisma = prisma;

app.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/diaries", diaryRoutes);

app.use((err, _req, res, _next) => {
	const status = err.statusCode || err.status || 500;
	res.status(status).json({
		message: err.message || "Internal server error",
	});
});

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

async function shutdown(signal) {
	try {
		await prisma.$disconnect();
	} finally {
		server.close(() => {
			console.log(`${signal} received, server stopped`);
			process.exit(0);
		});
	}
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));