import LocationFilter from "./LocationFilter";
import SalaryFilter from "./SalaryFilter";
import SkillFilter from "./SkillFilter";

const SearchFilterContainer = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm">篩選條件</div>
      <div className="flex gap-2">
        <LocationFilter />
        <SalaryFilter />
        <SkillFilter />
      </div>
    </div>
  );
};

export default SearchFilterContainer;
