const prisma = require("../lib/prisma");

function parseDate(value, label) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const error = new Error(`Invalid ${label} value`);
    error.statusCode = 400;
    throw error;
  }

  return date;
}

function countWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function toDayKey(date) {
  return date.toISOString().slice(0, 10);
}

async function generateSimpleReport(req, res, next) {
  try {
    const userId = req.user.userId;
    const from = parseDate(req.query.from, "from");
    const to = parseDate(req.query.to, "to");

    const where = { userId };

    if (from || to) {
      where.entryDate = {};

      if (from) {
        where.entryDate.gte = from;
      }

      if (to) {
        where.entryDate.lte = to;
      }
    }

    const diaries = await prisma.diary.findMany({
      where,
      orderBy: { entryDate: "asc" },
    });

    const dailyCounts = new Map();
    let totalWords = 0;

    for (const diary of diaries) {
      const dayKey = toDayKey(diary.entryDate);
      dailyCounts.set(dayKey, (dailyCounts.get(dayKey) || 0) + 1);
      totalWords += countWords(diary.content || "");
    }

    const report = {
      generatedAt: new Date().toISOString(),
      filters: {
        from: from ? from.toISOString() : null,
        to: to ? to.toISOString() : null,
      },
      summary: {
        totalDiaries: diaries.length,
        totalWords,
        averageWordsPerDiary: diaries.length ? Number((totalWords / diaries.length).toFixed(2)) : 0,
      },
      dailyCounts: Array.from(dailyCounts.entries()).map(([date, count]) => ({ date, count })),
      recentDiaries: diaries
        .slice(-5)
        .reverse()
        .map((diary) => ({
          id: diary.id,
          title: diary.title,
          entryDate: diary.entryDate,
          words: countWords(diary.content || ""),
        })),
    };

    return res.json({ report });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  generateSimpleReport,
};