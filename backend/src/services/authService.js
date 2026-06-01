const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserResponseDTO } = require("../dto/authDto");
const prisma = require("../lib/prisma");

async function registerUser({ email, password, name }) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name || null,
    },
  });

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    const error = new Error("JWT secret is not configured");
    error.statusCode = 500;
    throw error;
  }

  return {
    statusCode: 201,
    message: "User registered successfully",
    token: jwt.sign({ userId: user.id, email: user.email }, secret, {
      expiresIn: "7d",
    }),
    user: UserResponseDTO.from(user),
  };
}

async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    const error = new Error("JWT secret is not configured");
    error.statusCode = 500;
    throw error;
  }

  return {
    statusCode: 200,
    message: "Login successful",
    token: jwt.sign({ userId: user.id, email: user.email }, secret, {
      expiresIn: "7d",
    }),
    user: UserResponseDTO.from(user),
  };
}

module.exports = {
  loginUser,
  registerUser,
};