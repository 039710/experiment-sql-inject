const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const cors = require("cors");
const { user } = require("./models");
const bcryptjs = require("bcryptjs");
const db = require("./models").sequelize;
const morgan = require("morgan");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use(morgan("dev"));
app.get("/", (req, res) => {
  return res.sendFile(__dirname + path.join("/public/views/index.html"));
});
app.get("/success", (req, res) => {
  return res.sendFile(__dirname + path.join("/public/views/success.html"));
});
app.get("/*", (req, res) => {
  res.sendFile(__dirname + path.join("/public/views/index.html"));
});
app.post("/login", async (req, res) => {
  try {
    //const { email, password } = req.body;
    let email = req.body.email;
    let password = req.body.password;
    let stringQuery = `select username from users where username = '${email}' and password = '${password}'`;
    let results = await db.query(stringQuery, { type: db.QueryTypes.SELECT });
    if (results.length > 0) {
      res.send("success");
    } else {
      res.send("failure");
    }
    // db.query(stringQuery).then((data) => {
    //   if (data[0].length) {
    //     // let valid = bcryptjs.compareSync(password, data[0][0].password);
    //     // if (valid) {
    //     //   res.send("success");
    //     // } else {
    //     //   res.status(403).send("Invalid password");
    //     // }
    //     return res.status(200).json({
    //       username: data[0][0].username,
    //     });
    //   } else {
    //     console.log("gagal");
    //     return res.status(403).send("User not found");
    //   }
    // });
  } catch (err) {
    // console.log(err.message);
    return res.status(500).send("Server error");
  }
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
