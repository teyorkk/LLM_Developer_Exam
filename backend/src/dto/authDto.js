class RegisterUserDTO {
  constructor(email, password, name) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  static from(body = {}) {
    const { email, password, name } = body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    return new RegisterUserDTO(email, password, name || null);
  }
}

class LoginUserDTO {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static from(body = {}) {
    const { email, password } = body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    return new LoginUserDTO(email, password);
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