const Admin = require("../Schemas/AdminSchema");

class AdminUser {
  constructor(user, id) {
    this.user = user;
    this.tableName = "users";
    this.unicUser;
    this.id = id;
  }

  async createTable() {
    await Admin.sync();
  }

  async createUser() {
    await Admin.create({
      name: this.user.name,
      password: this.user.password,
    });
  }

  async findOneUser() {
    const users = await Admin.findOne({ where: { name: this.user.name } });
    return JSON.parse(JSON.stringify(users, null, 2));
  }
  async findOneUserById() {
    const users = await Admin.findOne({ where: { id: this.id } });
    return JSON.parse(JSON.stringify(users, null, 2));
  }
}

module.exports = AdminUser;
