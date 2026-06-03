function validationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeString(value, fieldName, { required = false } = {}) {
  if (value === undefined || value === null) {
    if (required) {
      throw validationError(`${fieldName} is required`);
    }

    return undefined;
  }

  if (typeof value !== "string") {
    throw validationError(`${fieldName} must be a string`);
  }

  const trimmed = value.trim();

  if (required && !trimmed) {
    throw validationError(`${fieldName} is required`);
  }

  return trimmed || undefined;
}

function normalizeEmail(value) {
  const email = normalizeString(value, "Email", { required: true });
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw validationError("Email must be a valid email address");
  }

  return email.toLowerCase();
}

function normalizePassword(value) {
  return normalizeString(value, "Password", { required: true });
}

function normalizeOptionalDate(value, fieldName) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    throw validationError(`Invalid ${fieldName} value`);
  }

  return parsedDate;
}

function requireBody(body) {
  if (!isPlainObject(body)) {
    throw validationError("Request body must be an object");
  }

  return body;
}

module.exports = {
  normalizeEmail,
  normalizeOptionalDate,
  normalizePassword,
  normalizeString,
  requireBody,
  validationError,
};
