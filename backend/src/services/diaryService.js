const { DiaryResponseDTO } = require("../dto/diaryDto");
const prisma = require("../lib/prisma");

async function listDiaryEntries(userId) {
  return prisma.diary.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

async function getDiaryEntry(userId, id) {
  const diary = await prisma.diary.findFirst({
    where: { id, userId },
  });

  if (!diary) {
    const error = new Error("Diary not found");
    error.statusCode = 404;
    throw error;
  }

  return DiaryResponseDTO.from(diary);
}

async function createDiaryEntry(userId, { title, content, entryDate }) {
  return prisma.diary.create({
    data: {
      title,
      content,
      entryDate: entryDate || new Date(),
      userId,
    },
  }).then((diary) => DiaryResponseDTO.from(diary));
}

async function updateDiaryEntry(userId, id, { title, content, entryDate }) {
  const existingDiary = await prisma.diary.findFirst({
    where: { id, userId },
  });

  if (!existingDiary) {
    const error = new Error("Diary not found");
    error.statusCode = 404;
    throw error;
  }

  const nextEntryDate = entryDate || existingDiary.entryDate;

  return prisma.diary.update({
    where: { id },
    data: {
      title: title ?? existingDiary.title,
      content: content ?? existingDiary.content,
      entryDate: nextEntryDate,
    },
  }).then((diary) => DiaryResponseDTO.from(diary));
}

async function deleteDiaryEntry(userId, id) {
  const existingDiary = await prisma.diary.findFirst({
    where: { id, userId },
  });

  if (!existingDiary) {
    const error = new Error("Diary not found");
    error.statusCode = 404;
    throw error;
  }

  await prisma.diary.delete({ where: { id } });
}

module.exports = {
  createDiaryEntry,
  deleteDiaryEntry,
  getDiaryEntry,
  listDiaryEntries,
  updateDiaryEntry,
};