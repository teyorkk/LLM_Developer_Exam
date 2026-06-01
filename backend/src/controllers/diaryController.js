const prisma = require("../lib/prisma");

function parseEntryDate(value) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const error = new Error("Invalid entryDate value");
    error.statusCode = 400;
    throw error;
  }

  return date;
}

async function listDiaries(req, res, next) {
  try {
    const userId = req.user.userId;

    const diaries = await prisma.diary.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ diaries });
  } catch (error) {
    return next(error);
  }
}

async function getDiary(req, res, next) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const diary = await prisma.diary.findFirst({
      where: { id, userId },
    });

    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    return res.json({ diary });
  } catch (error) {
    return next(error);
  }
}

async function createDiary(req, res, next) {
  try {
    const userId = req.user.userId;
    const { title, content, entryDate } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const diary = await prisma.diary.create({
      data: {
        title,
        content,
        entryDate: parseEntryDate(entryDate) || new Date(),
        userId,
      },
    });

    return res.status(201).json({ message: "Diary created successfully", diary });
  } catch (error) {
    return next(error);
  }
}

async function updateDiary(req, res, next) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { title, content, entryDate } = req.body;

    const existingDiary = await prisma.diary.findFirst({
      where: { id, userId },
    });

    if (!existingDiary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    const diary = await prisma.diary.update({
      where: { id },
      data: {
        title: title ?? existingDiary.title,
        content: content ?? existingDiary.content,
        entryDate: entryDate ? parseEntryDate(entryDate) : existingDiary.entryDate,
      },
    });

    return res.json({ message: "Diary updated successfully", diary });
  } catch (error) {
    return next(error);
  }
}

async function deleteDiary(req, res, next) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const existingDiary = await prisma.diary.findFirst({
      where: { id, userId },
    });

    if (!existingDiary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    await prisma.diary.delete({ where: { id } });

    return res.json({ message: "Diary deleted successfully" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listDiaries,
  getDiary,
  createDiary,
  updateDiary,
  deleteDiary,
};