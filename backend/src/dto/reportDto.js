const { normalizeOptionalDate } = require("../validators/requestValidators");

class ReportQueryDTO {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  static from(query = {}) {
    const { from, to } = query;
    const parsedFrom = normalizeOptionalDate(from, "from");
    const parsedTo = normalizeOptionalDate(to, "to");

    return new ReportQueryDTO(parsedFrom, parsedTo);
  }
}

module.exports = {
  ReportQueryDTO,
};
