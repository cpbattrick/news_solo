const fetchUserByUsername = require("../models/usersModels");

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(userArray => {
      const user = userArray[0];
      if (!userArray.length)
        return Promise.reject({ code: 404, msg: "User does not exist" });
      else res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = getUserByUsername;
