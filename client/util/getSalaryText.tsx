function roundToOne(num: string | number) {
  return +(Math.round(parseFloat(num + "e+1")) + "e-1");
}

export function getSalaryText({
  type,
  max,
  min,
}: {
  type: "hour" | "month";
  max: number;
  min: number;
}) {
  return type === "month"
    ? `${roundToOne(min / 10000)}萬 ~ ${roundToOne(max / 10000)}萬 TWD ／ 月`
    : `${min} ~ ${max} TWD ／ 時`;
}
