/**
 * Status logic:
 * - Completed  : currentStage is 'Harvested'
 * - At Risk    : no agent update in 7+ days, OR stage is overdue
 * - Active     : everything else
 *
 * Stage tracking:
 * - expectedStageDate   : date current stage should end, from plantingDate + durations
 * - daysUntilNextStage  : days remaining (negative = overdue)
 * - stageAlert          : true when 3 or fewer days remain
 * - stageOverdue        : true when expected date has passed
 * - stageProgress       : 0–100 % through current stage duration
 */

const STAGE_ORDER = ["Planted", "Growing", "Ready", "Harvested"];

function getCropDuration(crop) {
  if (!crop || !crop.growthStages || crop.growthStages.length === 0) return 100;
  return crop.growthStages.reduce((sum, s) => sum + (s.durationDays || 0), 0);
}

function getStageInfo(field) {
  const { currentStage, plantingDate, cropType } = field;

  if (!cropType || !cropType.growthStages) {
    return {
      expectedStageDate: null,
      daysUntilNextStage: null,
      stageAlert: false,
      stageOverdue: false,
      stageProgress: 0,
      nextStage: null,
      currentStageDuration: null,
    };
  }

  const today = new Date();
  const planting = new Date(plantingDate);

  // 1. Finding the actual stage object from the database using the field's current stage name
  const currentStageObj = cropType.growthStages.find(
    (s) => s.stageName === currentStage,
  );

  // 2. Identifying the category (the "bucket") this stage belongs to.
  // If not found in the DB, we fall back to the name itself for safety.
  const currentCategory = currentStageObj
    ? currentStageObj.category
    : currentStage;

  // 3. Create a map of the cumulative durations for categories
  // Since multiple custom stages might fall under "Growing", we sum them by category.
  const categoryDurationMap = {
    Planted: 0,
    Growing: 0,
    Ready: 0,
    Harvested: 0,
  };

  cropType.growthStages.forEach((s) => {
    if (categoryDurationMap.hasOwnProperty(s.category)) {
      categoryDurationMap[s.category] += s.durationDays || 0;
    }
  });

  // Calculate start date by summing durations of all preceding categories in STAGE_ORDER
  const currentIndex = STAGE_ORDER.indexOf(currentCategory);
  let stageStartDate = new Date(planting);
  for (let i = 0; i < currentIndex; i++) {
    const categoryName = STAGE_ORDER[i];
    stageStartDate.setDate(
      stageStartDate.getDate() + (categoryDurationMap[categoryName] || 0),
    );
  }

  // Use the mapped duration for the current category
  const currentStageDuration = categoryDurationMap[currentCategory] || 0;
  const expectedStageDate = new Date(stageStartDate);
  expectedStageDate.setDate(expectedStageDate.getDate() + currentStageDuration);

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUntilNextStage = Math.ceil((expectedStageDate - today) / msPerDay);
  const daysIntoStage = Math.floor((today - stageStartDate) / msPerDay);

  const stageProgress =
    currentStageDuration > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((daysIntoStage / currentStageDuration) * 100)),
        )
      : 100;

  const nextStage =
    currentIndex < STAGE_ORDER.length - 1
      ? STAGE_ORDER[currentIndex + 1]
      : null;

  return {
    expectedStageDate,
    daysUntilNextStage,
    stageAlert: daysUntilNextStage >= 0 && daysUntilNextStage <= 3,
    stageOverdue: daysUntilNextStage < 0,
    stageProgress,
    nextStage,
    currentStageDuration,
  };
}

function getFieldStatus(field) {
  const { currentStage, updates, cropType } = field;

  // Use the mapping logic to check if we are in the 'Harvested' category
  const currentStageObj = cropType?.growthStages?.find(
    (s) => s.stageName === currentStage,
  );
  const currentCategory = currentStageObj
    ? currentStageObj.category
    : currentStage;

  if (currentCategory === "Harvested") return "Completed";

  const today = new Date();

  if (updates && updates.length > 0) {
    const lastUpdate = new Date(updates[updates.length - 1].createdAt);
    const daysSinceUpdate = Math.floor(
      (today - lastUpdate) / (1000 * 60 * 60 * 24),
    );
    if (daysSinceUpdate > 7) return "At Risk";
  }

  const { stageOverdue } = getStageInfo(field);
  if (stageOverdue) return "At Risk";

  return "Active";
}

module.exports = { getFieldStatus, getStageInfo, getCropDuration };
