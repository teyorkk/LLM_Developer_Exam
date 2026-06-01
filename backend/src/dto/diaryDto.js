class CreateDiaryDTO {
  constructor(title, content, entryDate) {
    this.title = title;
    this.content = content;
    this.entryDate = entryDate;
  }

  static from(body = {}) {
    const { title, content, entryDate } = body;

    if (!title || !content) {
      const error = new Error("Title and content are required");
      error.statusCode = 400;
      throw error;
    }

    let parsedEntryDate;

    if (entryDate) {
      parsedEntryDate = new Date(entryDate);

      if (Number.isNaN(parsedEntryDate.getTime())) {
        const error = new Error("Invalid entryDate value");
        error.statusCode = 400;
        throw error;
      }
    }

    return new CreateDiaryDTO(title, content, parsedEntryDate);
  }
}

class UpdateDiaryDTO {
  constructor(title, content, entryDate) {
    this.title = title;
    this.content = content;
    this.entryDate = entryDate;
  }

  static from(body = {}) {
    const { title, content, entryDate } = body;

    if (entryDate) {
      const parsedEntryDate = new Date(entryDate);

      if (Number.isNaN(parsedEntryDate.getTime())) {
        const error = new Error("Invalid entryDate value");
        error.statusCode = 400;
        throw error;
      }

      return new UpdateDiaryDTO(title, content, parsedEntryDate);
    }

    return new UpdateDiaryDTO(title, content, undefined);
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