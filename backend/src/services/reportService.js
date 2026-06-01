const prisma = require("../lib/prisma");

async function generateSimpleReportData(userId, query) {
  const { from, to } = query;

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
    const dayKey = diary.entryDate.toISOString().slice(0, 10);
    dailyCounts.set(dayKey, (dailyCounts.get(dayKey) || 0) + 1);
    totalWords += diary.content
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }

  return {
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
        words: diary.content
          .trim()
          .split(/\s+/)
          .filter(Boolean).length,
      })),
  };
}

module.exports = {
  generateSimpleReportData,
};