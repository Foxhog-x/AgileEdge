const express = require("express");
const app = express();
app.use(express.json());

app.use("/", require("./router/login/login.js"));
app.use("/addmember", require("./router/addmemeber/addmember.js"));
app.use("/createadmin", require("./router/createAdmin/createadmin.js"));

app.listen(8000, () => {
  console.log("port is listening on 8000");
});
