const { LoginUserDTO, RegisterUserDTO } = require("../dto/authDto");
const { loginUser, registerUser } = require("../services/authService");

async function register(req, res, next) {
  try {
    const input = RegisterUserDTO.from(req.body);
    const result = await registerUser(input);
    return res.status(result.statusCode).json({
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const input = LoginUserDTO.from(req.body);
    const result = await loginUser(input);
    return res.status(result.statusCode).json({
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
};