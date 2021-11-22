import { Router } from "express";

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/", (req, res) => {
  res.status(200).send({
    status: "server is running",
  });
});
