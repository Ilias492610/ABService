export const calculateAreaPriorityScore = (signals) => {
  const bounds = {
    searchDemand: 5,
    searchConsoleOpportunity: 5,
    projectEvidence: 5,
    reviewEvidence: 3,
    commercialValue: 5,
    operationalAttractiveness: 4,
    organicCompetitionOpportunity: 3,
  };
  const invalid = Object.entries(bounds).some(([factor, maximum]) => {
    const value = signals[factor];
    return !Number.isFinite(value) || value < 0 || value > maximum;
  });
  if (invalid) return null;
  return Object.keys(bounds).reduce((score, factor) => score + signals[factor], 0);
};
