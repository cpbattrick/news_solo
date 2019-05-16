const fetchUserByUsername = require("../models/usersModels");

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      if (!user.length)
        return Promise.reject({ code: 404, msg: "User does not exist" });
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = getUserByUsername;
