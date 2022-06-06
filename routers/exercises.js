const axios = require("axios");
const { Router } = require("express");
const authMiddleware = require("./auth");
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
    const { exerciseId } = req.body;
    const userId = req.user.id;

    const newFavourite = await Favourites.create({
      userId: userId,
      exerciseId: exerciseId,
    });

    const exercise = await Exercises.findAll({ where: { apiId: exerciseId } });
    if (exercise) {
      res.status(400).send("Exercise already exist");
    }
    const newExercise = await Exercises.create({ apiId: exerciseId });
    res.send(newFavourite);
    res.send(newExercise);
  } catch (error) {
    console.log(error.message);
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
