import { calculateAreaPriorityScore } from "./service-area-scoring.mjs";

export const projects = Object.freeze([]);

const requiredProjectFields = [
  "path",
  "title",
  "status",
  "service",
  "province",
  "city",
  "brand",
  "approximateDate",
  "problem",
  "solution",
  "situation",
  "workPerformed",
  "outcome",
  "authenticPhotos",
  "customerApproval",
  "reviewApproved",
  "workEvidence",
];

export const validateProjectForPublication = (project = {}) => {
  const missing = requiredProjectFields.filter((field) => {
    const value = project[field];
    if (field === "customerApproval") return value !== true;
    if (field === "reviewApproved") return typeof value !== "boolean";
    if (field === "authenticPhotos") {
      return !Array.isArray(value) || value.length === 0 || value.some((photo) => photo.verified !== true);
    }
    if (field === "workPerformed") return !Array.isArray(value) || value.length === 0;
    return typeof value !== "string" || value.trim() === "";
  });

  if (project.reviewApproved === true && !project.reviewText?.trim()) {
    missing.push("reviewText");
  }

  return { ok: missing.length === 0, missing };
};

const normalize = (value) => String(value ?? "").trim().toLocaleLowerCase("nl-BE");

export const getPublishedProjects = (entries = projects) =>
  entries.filter(
    (project) => project.status === "published" && validateProjectForPublication(project).ok
  );

export const getPublishedProjectsForHub = (province, entries = projects) =>
  getPublishedProjects(entries).filter(
    (project) => normalize(project.province) === normalize(province)
  );

export const deriveAreaEvidence = (area, entries = projects) => {
  const matchingProjects = getPublishedProjects(entries).filter((project) =>
    area.type === "district"
      ? normalize(project.district) === normalize(area.name)
      : normalize(project.city) === normalize(area.name)
  );
  const hasLocalReview = matchingProjects.some(
    (project) => project.reviewApproved === true && project.reviewText?.trim()
  );
  const prioritySignals = {
    ...area.prioritySignals,
    projectEvidence: matchingProjects.length >= 2 ? 5 : matchingProjects.length === 1 ? 3 : 0,
    reviewEvidence: hasLocalReview ? 3 : 0,
  };

  return Object.freeze({
    ...area,
    hasProjectEvidence: matchingProjects.length > 0,
    hasLocalReview,
    projectCount: matchingProjects.length,
    matchingProjects: Object.freeze(matchingProjects),
    prioritySignals: Object.freeze(prioritySignals),
    priorityScore: calculateAreaPriorityScore(prioritySignals),
  });
};
