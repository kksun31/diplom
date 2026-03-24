import { ACTION } from "@/generated/prisma/enums";
import { AuditLog } from "@/generated/prisma/client";
export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;
  const translatedEntityType = entityType === "CARD" ? "карточку" : "список";

  switch (action) {
    case ACTION.CREATE:
      return `создал(а) ${translatedEntityType} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `обновил(а) ${translatedEntityType} "${entityTitle}"`;
    case ACTION.DELETE:
      return `удалил(а) ${translatedEntityType} "${entityTitle}"`;
    default:
      return `выполнил(а) действие с "${entityTitle}"`;
  }
};
