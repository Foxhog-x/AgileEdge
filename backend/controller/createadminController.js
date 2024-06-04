const db_con = require(".././db");
const passwordHelp = require(".././helpers/hashPasswordHelper");

const createAdmin = async (req, res) => {
  const { email, password, username, organization } = req.body;
  const resultPassword = await passwordHelp.createHashpassword(password);
  try {
    db_con.query(
      `INSERT INTO user(email, password, username, organization) values("${email}", "${resultPassword}", "${username}", "${organization}")`,
      (error, results) => {
        if (error) res.json({ sqlerror: error });
        if (results) {
          console.log(resultPassword);
          const message = `successfully insert affected rows are : ${results.affectedRows()}`;
          res.status(201).json({ success: true, message: message });
        }
      }
    );
  } catch (error) {
    if (error) res.json({ error });
  }
};

module.exports = { createAdmin };
