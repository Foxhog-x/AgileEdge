const db_con = require(".././db");

const addmember = (req, res) => {
  const { user_id, member_name, organization } = req.body;
  db_con.query(
    `insert into members(user_id, member_name, organization) values(${user_id}, "${member_name}", "${organization}")`,
    (error, results) => {
      if (error) res.status(500).json({ success: false, message: error });
      if (results) {
        console.log("successfully memeber created", results.affectedRows);
        res.json({ success: true, message: "Created Successfully " });
      }
    }
  );
};

module.exports = { addmember };
