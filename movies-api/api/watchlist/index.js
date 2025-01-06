import express from "express";
import Watchlist from "../watchlist/watchListModel.js";
import authenticateToken from "../../authenticate/index.js";

const router = express.Router();
//Get
router.get("/", authenticateToken, async (req, res) => {
    try {
      const watchlist = await Watchlist.find({ userId: req.user._id });
      res.status(200).json(watchlist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watchlist", error });
    }
  });
  //Add
  router.post("/:movieId", authenticateToken, async (req, res) => {
    const { movieId } = req.params;
    try {
      const newEntry = new Watchlist({ userId: req.user._id, movieId });
      await newEntry.save();
      res.status(201).json({ message: "Movie added to watchlist" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add movie to watchlist", error });
    }
  });
  
  // DELETE
  router.delete("/:movieId", authenticateToken, async (req, res) => {
    const { movieId } = req.params;
    try {
      await Watchlist.deleteOne({ userId: req.user._id, movieId });
      res.status(200).json({ message: "Movie removed from watchlist" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove movie from watchlist", error });
    }
  });
  
  export default router;