const db_con = require(".././db");
const passwordHelp = require(".././helpers/hashPasswordHelper");
const jwt = require("jsonwebtoken");
const privateKeyjwt = "wwpbr";
const login = async (req, res) => {
  const { email, password } = req.body;

  db_con.query(
    `SELECT password From users WHERE email ="${email}"`,
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
          const userObj = {
            email,
          };
          try {
            jwt.sign(
              userObj,
              privateKeyjwt,
              { expiresIn: "360h" },
              (error, token) => {
                if (error) console.log(error);
                res.json({
                  success: true,
                  message: "login successfull",
                  token,
                });
              }
            );
          } catch (error) {
            if (error) res.json({ error });
          }
        } else {
          res.json({ success: false, message: "login unsuccessfull" });
        }
      }
    }
  );
};

module.exports = { login };
