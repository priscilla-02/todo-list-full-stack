import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import { prismaClient } from "./db";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.get("/checkDbConnection", async (req, res) => {
    try {
        await prismaClient.$connect();
        res.status(200).json({ message: "Prisma connected successfully" });
    } catch (error) {
        console.error("Failed to connect to database:", error);
        res.status(500).json({ error: "Failed to connect to database" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
