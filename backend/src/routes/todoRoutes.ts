import express, { Request, Response } from "express";
import { prismaClient } from "../db";
import { z } from "zod";

const router = express.Router();

const todoSchema = z.object({
    item: z.string().min(1, { message: "Please enter a value for to-do item" }),
    user_id: z.number(),
    email: z.string(),
});

const updateTodoSchema = z.object({
    completed: z.boolean(),
    user_id: z.number(),
    email: z.string(),
});

const removeTodoSchema = z.object({
    user_id: z.number(),
    email: z.string(),
});

router.get("/fetchToDo", async (req: Request, res: Response) => {
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

router.post("/addToDo", async (req: Request, res: Response) => {
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

router.delete("/deleteItem/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { email, user_id } = removeTodoSchema.parse(req.body);
        const deletedTodo = await prismaClient.todo_list.delete({
            where: { id: Number(id), email: email, user_id: user_id },
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

router.patch("/completeItem/:id", async (req: Request, res: Response) => {
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

export default router;
