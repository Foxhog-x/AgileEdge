const express = require("express");
const user_auth = require("./middleware/user_auth.js");
const app = express();
app.use(express.json());
console.log("jello");
app.use("/admin", require("./router/login/login.js"));
app.use("/member", require("./router/login/memberLogin.js"));
app.use("/createadmin", require("./router/createAdmin/createadmin.js"));
app.use("/addmember", require("./router/addmemeber/addmember.js"));
app.use("/board/public", require("./router/board/publicBoard.js"));
app.use("/board/private", user_auth, require("./router/board/privateBoard.js"));
app.use("/list/column", require("./router/list_Column/list_Column.js"));
app.use("/card", user_auth, require("./router/card/card.js"));
app.use("/comments", require("./router/comment/comment.js"));

app.listen(8000, () => {
  console.log("port is listening on 8000");
});
