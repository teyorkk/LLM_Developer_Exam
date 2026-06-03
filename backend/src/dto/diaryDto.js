const {
  normalizeOptionalDate,
  normalizeString,
  requireBody,
} = require("../validators/requestValidators");

class CreateDiaryDTO {
  constructor(title, content, entryDate) {
    this.title = title;
    this.content = content;
    this.entryDate = entryDate;
  }

  static from(body = {}) {
    const { title, content, entryDate } = requireBody(body);

    return new CreateDiaryDTO(
      normalizeString(title, "Title", { required: true }),
      normalizeString(content, "Content", { required: true }),
      normalizeOptionalDate(entryDate, "entryDate"),
    );
  }
}

class UpdateDiaryDTO {
  constructor(title, content, entryDate) {
    this.title = title;
    this.content = content;
    this.entryDate = entryDate;
  }

  static from(body = {}) {
    const { title, content, entryDate } = requireBody(body);

    return new UpdateDiaryDTO(
      normalizeString(title, "Title"),
      normalizeString(content, "Content"),
      normalizeOptionalDate(entryDate, "entryDate"),
    );
  }
}

class DiaryResponseDTO {
  static from(diary) {
    return {
      id: diary.id,
      title: diary.title,
      content: diary.content,
      entryDate: diary.entryDate,
      createdAt: diary.createdAt,
      updatedAt: diary.updatedAt,
      userId: diary.userId,
    };
  }
}

module.exports = {
  CreateDiaryDTO,
  DiaryResponseDTO,
  UpdateDiaryDTO,
};
