// const { connect } = require("../config/db");

// class AdminUser {
//   constructor(user) {
//     this.user = user;
//     this.tableName = "users";
//     this.unicUser;
//   }
//   createTable() {
//     const sql = `
//   CREATE TABLE IF NOT EXISTS ${this.tableName} (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255),
//     password VARCHAR(255)
//   )
// `;
//     const newTable = connect.execute(sql);

//     return newTable;
//   }

//   addUser() {
//     const sql = `INSERT INTO ${this.tableName} SET ?`;
//     const newUser = connect.query(sql, this.user);

//     return newUser;
//   }

//   allUsers() {
//     let lll = false;
//     let q = "";
//     connect.execute(
//       `SELECT * FROM ${this.tableName} WHERE name = ?`,
//       [this.user.name],
//       (err, res) => {
//         if (err) return console.log(err);
//         if (res.length > 0) {
//           console.log(res.length);
//           lll = true;
//           q = "dadwddawd";
//           return;
//         }
//       }
//     );
//     console.log(q);
//     return lll;
//   }
// }

// // connect.query(
// //   `SELECT * FROM ${this.tableName} WHERE name = ?`,
// //   [this.user.name],
// //   (err, results) => {
// //     if (err) throw err;

// //     if (results.length > 0) {
// //       console.log(
// //         `Користувач з ім'ям ${this.user.name} існує в базі даних`
// //       );
// //     } else {
// //       console.log(
// //         `Користувача з ім'ям ${this.user.name} немає в базі даних`
// //       );
// //     }
// //     console.log(results);
// //     return results;
// //   }
// // );

// module.exports = AdminUser;
const Admin = require("../Schemas/AdminSchema");

class AdminUser {
  constructor(user) {
    this.user = user;
    this.tableName = "users";
    this.unicUser;
  }

  async createTable() {
    await Admin.sync()
      .then(() => console.log("User table created successfully"))
      .catch((err) => console.log("Error while creating User table", err));
  }

  async createUser() {
    await Admin.create({
      name: this.user.name,
      password: this.user.password,
    })
      .then((user) => {
        console.log(user.toJSON());
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async allUsers() {
    const users = await Admin.findAll();
    return JSON.parse(JSON.stringify(users, null, 2));
  }
}

module.exports = AdminUser;
