const user_auth = require("../middleware/user_auth");

const createCard = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const deleteCard = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const updateCard = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const fetchCard = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

module.exports = { createCard, deleteCard, updateCard, fetchCard };
