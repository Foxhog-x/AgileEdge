//private Board Controllers
const create_board = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const delete_board = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const update_board = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const fetch_board = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

module.exports = { create_board, delete_board, update_board, fetch_board };
