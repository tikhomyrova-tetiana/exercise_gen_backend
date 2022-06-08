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

    console.log(name, email, age, gender, photo);

    const user = await User.findByPk(id);
    const updatedUser = await user.update({
      name: name,
      email: email,
      age: age,
      gender: gender,
      photo: photo,
    });

    // if (password) {
    //   await user.update({
    //     password: bcrypt.hashSync(password, SALT_ROUNDS),
    //   });
    // }

    res.send(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = userRouter;
