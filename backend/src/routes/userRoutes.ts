import express, { Request, Response } from "express";
import { prismaClient } from "../db";
import { z } from "zod";

const router = express.Router();

const bcrypt = require("bcrypt");

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});

router.post("/register", async (req: Request, res: Response) => {
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

router.post("/login", async (req: Request, res: Response) => {
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

export default router;
