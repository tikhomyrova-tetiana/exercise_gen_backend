module.exports = {
  SALT_ROUNDS: 10,
  PORT: process.env.PORT || 4000,
  EXT_API: "https://exercisedb.p.rapidapi.com",
  HEADERS: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": "d067087cb5msh916566a37810f52p163719jsnf04db4e1577b",
  },
};
