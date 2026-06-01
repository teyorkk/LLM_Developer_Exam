const { CreateDiaryDTO, UpdateDiaryDTO } = require("../dto/diaryDto");
const {
  createDiaryEntry,
  deleteDiaryEntry,
  getDiaryEntry,
  listDiaryEntries,
  updateDiaryEntry,
} = require("../services/diaryService");

async function listDiaries(req, res, next) {
  try {
    const diaries = await listDiaryEntries(req.user.userId);
    return res.json({ diaries });
  } catch (error) {
    return next(error);
  }
}

async function getDiary(req, res, next) {
  try {
    const diary = await getDiaryEntry(req.user.userId, req.params.id);
    return res.json({ diary });
  } catch (error) {
    return next(error);
  }
}

async function createDiary(req, res, next) {
  try {
    const input = CreateDiaryDTO.from(req.body);
    const diary = await createDiaryEntry(req.user.userId, input);
    return res.status(201).json({ message: "Diary created successfully", diary });
  } catch (error) {
    return next(error);
  }
}

async function updateDiary(req, res, next) {
  try {
    const input = UpdateDiaryDTO.from(req.body);
    const diary = await updateDiaryEntry(req.user.userId, req.params.id, input);
    return res.json({ message: "Diary updated successfully", diary });
  } catch (error) {
    return next(error);
  }
}

async function deleteDiary(req, res, next) {
  try {
    await deleteDiaryEntry(req.user.userId, req.params.id);
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