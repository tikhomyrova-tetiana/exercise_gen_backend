const axios = require("axios");
const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Favourites = require("../models").userexercise;
const Exercises = require("../models").exercise;
const Completed = require("../models").completedexercise;

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

// to check this route:
// first do this request   http POST :4000/auth/login email=test@test.com password=test1234
// Create a new exercise
// get token and then do this    http POST :4000/exercises/favourites apiId=3201 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NDYwMzA4NSwiZXhwIjoxNjU0NjEwMjg1fQ.UnQi0wnvUexY1xC3BAh_OpbyzJsgIXCd2bxKJrpg4M0"
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
});

router.get("/favourites", authMiddleware, async (req, res, next) => {
  // Add authmiddleware to get user id and then find only favorites of this user
  const userId = req.user.id;
  try {
    const allFavourites = await Favourites.findAll({
      where: { userId: userId },
      include: [Exercises],
    });
    res.send(allFavourites);
  } catch (error) {
    console.log(error.message);
  }
});

// http GET :4000/exercises/completed Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NDY5MzUyOCwiZXhwIjoxNjU0NzAwNzI4fQ.bMJ3vM0bO6yjLrYBWOTSZjNjH4jRboA8dEHs-EX41bs"
router.get("/completed", authMiddleware, async (req, res, next) => {
  // Add authmiddleware to get user id and then find only favorites of this user
  const userId = req.user.id;
  try {
    const allCompleted = await Completed.findAll({
      where: { userId: userId },
    });
    res.send(allCompleted);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

// router.get("/", async (req, res, next) => {
//   try {

//   } catch (error) {
//     console.log(error.message)
//   }
// });

// GET all exercises from external API - don't need it for now
// router.get("/", async (req, res) => {
//   const options = {
//     method: "GET",
//     url: "https://exercisedb.p.rapidapi.com/exercises",
//     headers: {
//       "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
//       "X-RapidAPI-Key": "d067087cb5msh916566a37810f52p163719jsnf04db4e1577b",
//     },
//   };
//   try {
//     const { data } = await axios.request(options);
//     res.status(200).send(data);
//   } catch (err) {
//     console.log("error".err);
//   }
// });
