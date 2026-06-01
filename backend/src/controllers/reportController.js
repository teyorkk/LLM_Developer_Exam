const { ReportQueryDTO } = require("../dto/reportDto");
const { generateSimpleReportData } = require("../services/reportService");

async function generateSimpleReport(req, res, next) {
  try {
    const input = ReportQueryDTO.from(req.query);
    const report = await generateSimpleReportData(req.user.userId, input);
    return res.json({ report });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  generateSimpleReport,
};