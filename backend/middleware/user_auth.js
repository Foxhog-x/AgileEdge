const privateKeyjwt = "wwpbr";
const jwt = require("jsonwebtoken");
const db_con = require("../db");
const user_auth = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    req.token = token;
    jwt.verify(token, privateKeyjwt, (err, authorizedData) => {
      if (err) {
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        const email = authorizedData.email;
        db_con.query(
          `SELECT user_id, email, type FROM users WHERE email = "${email}"
          UNION
          SELECT member_id,email,type FROM members WHERE email = "${email}" `,
          (error, results) => {
            if (error) {
              console.log("ERROR: Could not connect to the protected route");
              res.json({ error });
            } else {
              let obj = results[0];
              let key = Object.keys(obj);
              if (key.includes("user_id")) {
                req.user_id = results[0].user_id;
                req.type = results[0].type;
                req.email = results[0].email;
                next();
              } else {
                if (key.includes("member_id")) {
                  req.member_id = results[0].user_id;
                  req.type = results[0].type;
                  req.email = results[0].email;
                  next();
                }
              }
            }
          }
        );
        console.log("SUCCESS: Connected to protected route");
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = user_auth;
