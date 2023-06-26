// const mysql = require("mysql");
// const express = require("express");
// // const editor = require('./assets/main.js');
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const encoder = bodyParser.urlencoded();

// const app = express();
// // const example = require("./main.js");

// app.use("/assets", express.static("assets"));

// if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require("node-localstorage").LocalStorage;
//   localStorage = new LocalStorage("./scratch");
// }

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "nodejs",
// });

// // connect to the database
// connection.connect(function (error) {
//   if (error) throw error;
//   else console.log("Connected to the database successfully!");
// });

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// app.get("/login", function (req, res) {
//   res.sendFile(__dirname + "/login.html");
// });

// app.get("/register", function (req, res) {
//   res.sendFile(__dirname + "/register.html");
// });

// app.post("/register", encoder, function (req, res) {
//   var username = req.body.username;
//   var mail = req.body.mail;
//   var password = req.body.password;

//   // Hash the password
//   bcrypt.hash(password, 10, function (err, hashedPassword) {
//     if (err) {
//       console.log("Password hashing error:", err);
//       res.redirect("/register");
//       return;
//     }

//     connection.query(
//       "INSERT INTO loginusers (full_name, mail, password) VALUES (?, ?, ?)",
//       [username, mail, hashedPassword],
//       function (error, results, fields) {
//         if (error) {
//           console.log("Registration failed:", error);
//           res.redirect("/register");
//         } else {
//           console.log("Registration successful!");
//           res.redirect("/login");
//         }
//         res.end();
//       }
//     );
//   });
// });
// app.get("/geoportail", function (req, res) {
//   res.sendFile(__dirname + "/geoportail.html");
//   console.log("res : " + res.editor);
// });

// app.post("/login", encoder, function (req, res) {
//   var mail = req.body.mail;
//   var password = req.body.password;

//   connection.query(
//     "SELECT * FROM loginusers WHERE mail = ?",
//     [mail],
//     function (error, results, fields) {
//       if (error) {
//         console.log("Login error:", error);
//         res.redirect("/login");
//         // console.log(results);
//         return;
//       }

//       if (results.length > 0) {
//         var storedPassword = results[0].password;

//         // Compare the hashed password
//         bcrypt.compare(password, storedPassword, function (err, result) {
//           if (err) {
//             console.log("Password comparison error:", err);
//             res.redirect("/login");
//             return;
//           }

//           if (result) {
//             res.redirect("/geoportail");
//             // res.render("result", result);
//           } else {
//             res.redirect("/login");
//           }
//         });
//       } else {
//         res.redirect("/login");
//       }
//     }
//   );
// });

// // when login is successful
// app.get("/welcome", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// // set app port
// const server = app.listen(3000, "192.168.11.121", function () {
//   console.log("Server is listening on port 3000");
// });
// module.exports = server;

const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const encoder = bodyParser.urlencoded();

app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected to the database successfully!");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/register.html");
});

app.post("/register", encoder, function (req, res) {
  var username = req.body.username;
  var mail = req.body.mail;
  var password = req.body.password;

  bcrypt.hash(password, 10, function (err, hashedPassword) {
    if (err) {
      console.log("Password hashing error:", err);
      res.redirect("/register");
      return;
    }

    connection.query(
      "INSERT INTO loginusers (full_name, mail, password) VALUES (?, ?, ?)",
      [username, mail, hashedPassword],
      function (error, results, fields) {
        if (error) {
          console.log("Registration failed:", error);
          res.redirect("/register");
        } else {
          console.log("Registration successful!");
          res.redirect("/login");
        }
      }
    );
  });
});

app.get("/geoportail", function (req, res) {
  res.sendFile(__dirname + "/geoportail.html");
});

app.post("/login", encoder, function (req, res) {
  var mail = req.body.mail;
  var password = req.body.password;

  connection.query(
    "SELECT * FROM loginusers WHERE mail = ?",
    [mail],
    function (error, results, fields) {
      if (error) {
        console.log("Login error:", error);
        res.redirect("/geoportail");
        return;
      }

      if (results.length > 0) {
        var storedPassword = results[0].password;

        bcrypt.compare(password, storedPassword, function (err, result) {
          if (err) {
            console.log("Password comparison error:", err);
            res.redirect("/geoportail");
            return;
          }

          if (result) {
            res.redirect("/geoportail");
          } else {
            res.redirect("/geoportail");
          }
        });
      } else {
        res.redirect("/geoportail");
      }
    }
  );
});

// app.get("/welcome", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

const server = app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});

module.exports = server;
