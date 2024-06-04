const db_con = require(".././db");
const passwordHelp = require(".././helpers/hashPasswordHelper");

const login = async (req, res) => {
  const { email, password } = req.body;

  db_con.query(
    `SELECT password From user WHERE email ="${email}"`,
    async (error, results) => {
      if (error) res.json({ sqlError: error });
      if (results) {
        const encryptedHashPassword = results[0]?.password;

        const compareResult = await passwordHelp.descriptHashPassword(
          password,
          encryptedHashPassword
        );
        console.log(compareResult);
        if (compareResult) {
          res.json({ success: true, message: "login successfull" });
        } else {
          res.json({ success: false, message: "login unsuccessfull" });
        }
      }
    }
  );
};

module.exports = { login };
