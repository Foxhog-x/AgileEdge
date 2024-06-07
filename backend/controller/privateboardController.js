const db_con = require("../db");

//private Board Controllers
const create_board = (req, res) => {
  const { board_name, description, user_id, board_type } = req.body;
  const created_by = req.email;
  
  try {
    db_con.query(
      `INSERT INTO boards(board_name, description, user_id, board_type, created_by) values ("${board_name}", "${description}",${user_id},"${board_type}","${created_by}")`,
      (error, results) => {
        if (error) res.json({ error });
        if (results) {
          console.log(results);
          res.status(201).json({
            success: true,
            message: `successfully created `,
          });
          console.log("successfully created", results.affectedRows);
        }
      }
    );
  } catch (error) {
    if (error) res.status(401).json({ error });
  }
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
