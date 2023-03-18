import React from "react";
import Card from "@/app/components/Card";
import SearchHeader from "./SearchHeader";
import SearchBar from "./SearchBar";
import SwitchSection from "./SwitchSection";
import SearchFilter from "./SearchFilter";

const SearchContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SearchHeader />
      <div className="flex flex-col gap-3">
        <Card>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <SearchBar />
              <div className="flex items-center gap-3 text-sm">
                <SwitchSection />
              </div>
            </div>
            <SearchFilter />
          </div>
        </Card>

        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </>
  );
};

export default SearchContainer;
