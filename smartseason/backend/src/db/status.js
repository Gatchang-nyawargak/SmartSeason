/**
 * Status logic:
 * - Completed  → stage is 'harvested'
 * - At Risk    → stage is 'ready' but planting date was > 120 days ago (overdue harvest)
 *              OR stage is 'growing'/'planted' but planting date was > 90 days ago (stalled)
 * - Active     → everything else
 */
function computeStatus(stage, plantingDate) {
  if (stage === 'harvested') return 'completed';

  const daysSincePlanting = Math.floor(
    (Date.now() - new Date(plantingDate)) / (1000 * 60 * 60 * 24)
  );

  if (stage === 'ready' && daysSincePlanting > 120) return 'at_risk';
  if ((stage === 'planted' || stage === 'growing') && daysSincePlanting > 90) return 'at_risk';

  return 'active';
}

module.exports = { computeStatus };
