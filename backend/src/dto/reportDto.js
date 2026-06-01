class ReportQueryDTO {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  static from(query = {}) {
    const { from, to } = query;
    let parsedFrom;
    let parsedTo;

    if (from) {
      parsedFrom = new Date(from);

      if (Number.isNaN(parsedFrom.getTime())) {
        const error = new Error("Invalid from value");
        error.statusCode = 400;
        throw error;
      }
    }

    if (to) {
      parsedTo = new Date(to);

      if (Number.isNaN(parsedTo.getTime())) {
        const error = new Error("Invalid to value");
        error.statusCode = 400;
        throw error;
      }
    }

    return new ReportQueryDTO(parsedFrom, parsedTo);
  }
}

module.exports = {
  ReportQueryDTO,
};