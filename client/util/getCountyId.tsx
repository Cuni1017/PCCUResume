import TaiwanPostalCode from "@/data/TaiwanPostalCode.json";

const counties = Object.keys(TaiwanPostalCode);
export default function getCountyId(countyName: string) {
  return counties.findIndex((county) => county === countyName) + 1;
}
