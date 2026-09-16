export const projects = Object.freeze([]);

const requiredProjectFields = [
  "title",
  "service",
  "city",
  "approximateDate",
  "situation",
  "workPerformed",
  "outcome",
  "authenticPhotos",
  "customerApproval",
  "workEvidence",
];

export const validateProjectForPublication = (project = {}) => {
  const missing = requiredProjectFields.filter((field) => {
    const value = project[field];
    if (field === "customerApproval") return value !== true;
    if (field === "authenticPhotos") {
      return !Array.isArray(value) || value.length === 0 || value.some((photo) => photo.verified !== true);
    }
    if (field === "workPerformed") return !Array.isArray(value) || value.length === 0;
    return typeof value !== "string" || value.trim() === "";
  });

  return { ok: missing.length === 0, missing };
};
