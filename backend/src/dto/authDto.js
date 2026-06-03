const {
  normalizeEmail,
  normalizePassword,
  normalizeString,
  requireBody,
} = require("../validators/requestValidators");

class RegisterUserDTO {
  constructor(email, password, name) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  static from(body = {}) {
    const { email, password, name } = requireBody(body);

    return new RegisterUserDTO(
      normalizeEmail(email),
      normalizePassword(password),
      normalizeString(name, "Name") || null,
    );
  }
}

class LoginUserDTO {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static from(body = {}) {
    const { email, password } = requireBody(body);

    return new LoginUserDTO(normalizeEmail(email), normalizePassword(password));
  }
}

class UserResponseDTO {
  static from(user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

module.exports = {
  LoginUserDTO,
  RegisterUserDTO,
  UserResponseDTO,
};
