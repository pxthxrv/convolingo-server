const knex = require("knex")(require("../knexfile"));

const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await knex("Users") //.where("id", userId).first();
    .leftJoin('Languages', 'Users.target_language', '=', 'Languages.id') // Using leftJoin here
    .select('Users.*', 'Languages.display_name as target_language_display')
    .where('Users.id', userId)
    .first();

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user information." });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const {
    username,
    email,
    first_name,
    last_name,
    date_of_birth,
    native_language,
    target_language,
    time_per_day,
    level,
    difficulty,
    cefr,
  } = req.body;

  // validate date
  const formattedDate = new Date(date_of_birth).toISOString().split("T")[0];

  try {
    await knex("Users").where("id", userId).update({
      username,
      email,
      first_name,
      last_name,
      date_of_birth: formattedDate,
      native_language,
      target_language,
      time_per_day,
      level,
      difficulty,
      cefr,
    });

    res.status(200).json({ message: "User information updated successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Failed to update user information.",
        detailedError: error.message,
      });
  }
};

module.exports = {
  getUser,
  updateUser,
};
