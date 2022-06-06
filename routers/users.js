const express = require("express");
const { Router } = express;
const userRouter = new Router();
const User = require("../models").user;
// const bcrypt = require("bcrypt");
// const { SALT_ROUNDS } = require("../config/constants");

userRouter.patch("/:id", async (req, res, next) => {
  try {
    const { name, email, age, gender, photo } = req.body;
    const { id } = req.params;
    const user = await User.findByPk(id);
    const updatedUser = await user.update({
      name: name,
      email: email,
      //   password: bcrypt.hashSync({ password }, SALT_ROUNDS),
      age: age,
      gender: gender,
      photo: photo,
    });

    res.send(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = userRouter;