const axios = require("axios");
const { Router } = require("express");

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
router.post("/exercises", (req, res) => {
  /* body = {
        userId: req.user USING MIDDLE WARE
        exerciseId: exercise.id from API
        set: 3
        repetition: random || 0
        time: random || 0
    } */
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
