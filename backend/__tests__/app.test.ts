import request from "supertest";
import app from "../src";

describe("POST /addToDo", () => {
    it("should create a new todo item", async () => {
        const newTodo = {
            item: "Test Todo",
            completed: false,
            user_id: 1,
            email: "test@example.com",
        };

        const response = await request(app).post("/addToDo").send({
            item: "Test Todo",
            user_id: 1,
            email: "test@example.com",
        });

        expect(response.status).toBe(201);
        expect(typeof response.body.id).toBe("number");
        expect(response.body.item).toBe(newTodo.item);
        expect(response.body.completed).toBe(newTodo.completed);
        expect(response.body.user_id).toBe(newTodo.user_id);
        expect(response.body.email).toBe(newTodo.email);
    });

    it("should return 400 when missing field", async () => {
        const response = await request(app).post("/addToDo").send({
            item: "Test Todo",
            email: "test@example.com",
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });
});
