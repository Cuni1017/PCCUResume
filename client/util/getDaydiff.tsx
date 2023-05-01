export const getDayDiff = (from: Date, to: Date) => {
  return (to.getTime() - from.getTime()) / 86400000;
};
