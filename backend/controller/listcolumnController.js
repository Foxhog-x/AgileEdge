const createList = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const deleteList = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const fetchList = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

module.exports = { createList, deleteList, fetchList };
