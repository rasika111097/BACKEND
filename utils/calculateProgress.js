const calculateProgress = (
  completed,
  total
) => {
  if (total === 0) return 0;

  return Math.round(
    (completed / total) * 100
  );
};

module.exports = calculateProgress;