const { Router } = require("express");
const Repetitions = require("../models").repetition;

const repRouter = new Router();

repRouter.get("/", async (req, res, next) => {
  try {
    const repetitions = await Repetitions.findAll();
    res.send(repetitions);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = repRouter;
