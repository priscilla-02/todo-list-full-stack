import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "PATCH") {
    const { id } = req.query;
    const { completed, user_id, email } = req.body;
    try {
      const response = await fetch(`http://localhost:5000/completeItem/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed, user_id, email }),
      });
      if (!response.ok) {
        throw new Error("Failed to update to-do item");
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error updating to-do item:", error);
      res.status(500).json({ error: "Failed to update to-do item" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}