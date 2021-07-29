export const handleChangeScore = (currentScoreName, setNote, setErrors) => {
  setNote((prev) => ({ ...prev, score: currentScoreName }));
  const flag = currentScoreName.match(/(^\W+$)/gim);
  setErrors((prev) => ({ ...prev, score: flag }));
};

export const handleChangeCost = (currentCostValue, setNote, setErrors) => {
  setNote((prev) => ({ ...prev, cost: currentCostValue }));
  let flag = !!currentCostValue && !currentCostValue.match(/(^[1-9]+\d*$)/gim);
  setErrors((prev) => ({ ...prev, cost: flag }));
};
