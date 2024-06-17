import express from "express";
import cors from "cors";
import { prismaClient } from "./db";
import { z } from "zod";
const bcrypt = require("bcrypt");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});

const todoSchema = z.object({
    item: z.string().min(1, { message: "Cannot add empty to-do item" }),
    user_id: z.number(),
    email: z.string(),
});

const updateTodoSchema = z.object({
    completed: z.boolean(),
    user_id: z.number(),
    email: z.string(),
});

app.get("/checkDbConnection", async (req, res) => {
    try {
        await prismaClient.$connect();
        res.status(200).json({ message: "Prisma connected successfully" });
    } catch (error) {
        console.error("Failed to connect to database:", error);
        res.status(500).json({ error: "Failed to connect to database" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { email, password } = userSchema.parse(req.body);
        const existingUser = await prismaClient.user_list.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prismaClient.user_list.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = userSchema.parse(req.body);
        const user = await prismaClient.user_list.findUnique({
            where: { email },
        });
        if (!user) {
            return res
                .status(400)
                .json({ error: "Incorrect email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/addToDo", async (req, res) => {
    try {
        const { item, user_id, email } = todoSchema.parse(req.body);
        const newTodo = await prismaClient.todo_list.create({
            data: {
                item,
                completed: false,
                user_id,
                email,
            },
        });
        res.status(201).json(newTodo);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Error adding todo:", error);
        res.status(500).json({ error: "Failed to add todo" });
    }
});

app.get("/fetchToDo", async (req, res) => {
    const { user_id, email } = req.query;

    try {
        const todos = await prismaClient.todo_list.findMany({
            where: {
                user_id:
                    typeof user_id === "number" ? parseInt(user_id) : undefined,
                email: typeof email === "string" ? email : undefined,
            },
        });
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});

app.delete("/deleteItem/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await prismaClient.todo_list.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({
            message: "Todo item deleted successfully",
            deletedTodo,
        });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Failed to delete todo" });
    }
});

app.patch("/completeItem/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { completed, email, user_id } = updateTodoSchema.parse(req.body);
        const updatedTodo = await prismaClient.todo_list.update({
            where: { id: Number(id), email: email, user_id: user_id },
            data: { completed },
        });
        res.status(200).json({
            message: "Todo item updated successfully",
            updatedTodo,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Failed to update todo" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
