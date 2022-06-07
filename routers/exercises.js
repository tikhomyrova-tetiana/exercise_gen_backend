const axios = require("axios");
const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Favourites = require("../models").userexercise;
const Exercises = require("../models").exercise;

const router = new Router();

router.get("/equipment/:equipment", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/equipment/body%20weight",
    headers: {
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      "X-RapidAPI-Key": "d067087cb5msh916566a37810f52p163719jsnf04db4e1577b",
    },
  };

  try {
    const { data } = await axios.request(options);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("connection errors");
  }
});

// Create a new exercise
router.post("/favourites", authMiddleware, async (req, res) => {
  try {
    const { apiId } = req.body;
    const userId = req.user.id;

    // first need to add this apiId to exercise

    let exercise = await Exercises.findOne({ where: { apiId: apiId } });
    if (!exercise) {
      exercise = await Exercises.create({ apiId: apiId });
    }
    const oldFavourite = await Favourites.findOne({
      where: { exerciseId: exercise.id, userId: userId },
    });
    if (oldFavourite) {
      res.status(400).send("Favorite already exist");
      return;
    }
    const newFavourite = await Favourites.create({
      userId: userId,
      exerciseId: exercise.id,
    });

    res.send(newFavourite);
  } catch (error) {
    console.log(error);
  }
  /* body = {
        userId: req.user USING MIDDLE WARE
        exerciseId: exercise.id from API
    } */
});

router.get("/favourites", async (req, res, next) => {
  try {
    const allFavourites = await Favourites.findAll();
    res.send(allFavourites);
  } catch (error) {
    console.log(error.message);
  }
});

// GET all exercises - don't need it for now
router.get("/", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    headers: {
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      "X-RapidAPI-Key": "d067087cb5msh916566a37810f52p163719jsnf04db4e1577b",
    },
  };
  try {
    const { data } = await axios.request(options);
    res.status(200).send(data);
  } catch (err) {
    console.log("error".err);
  }
});

module.exports = router;
