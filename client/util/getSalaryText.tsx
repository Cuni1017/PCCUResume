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
    ? `${min / 10000}萬 ~ ${max / 10000}萬 TWD ／ 月`
    : `${min} ~ ${max} TWD ／ 時`;
}
