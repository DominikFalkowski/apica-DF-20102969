import express from "express";
import Watchlist from "../models/watchlistModel.js";
import authenticateToken from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try {
      const watchlist = await Watchlist.find({ userId: req.user._id });
      res.status(200).json(watchlist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watchlist", error });
    }
  });