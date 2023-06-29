class User {
  constructor(name, email, password, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role; // 'admin', 'user', etc.
  }
}

  
  module.exports = User;
  