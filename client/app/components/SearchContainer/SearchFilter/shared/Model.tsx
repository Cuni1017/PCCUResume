import React, { useState, useRef, useEffect } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const SearchFilterModel = ({
  children,
  label,
  align,
}: {
  children: React.ReactNode;
  label: string;
  align?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<any>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (divEl.current) {
      const handler = (e: any) => {
        if (!divEl.current) return;
        if (!divEl.current.contains(e.target)) setIsOpen(false);
      };
      document.addEventListener("mousedown", handler, true);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  }, []);

  return (
    <div ref={divEl} className="relative cursor-pointer rounded-sm md:w-auto">
      <div
        className={`flex items-center justify-between px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-sm select-none ${
          isOpen ? "bg-blue-100 hover:bg-blue-100" : ""
        }`}
        onClick={handleClick}
      >
        {label} <ExpandMoreOutlinedIcon />
      </div>

      <div
        className={`bg-white absolute top-10 ${align} border-solid border-gray-300 border rounded-md shadow cursor-auto z-10`}
        style={{ display: isOpen ? "block" : "none" }}
      >
        {children}
      </div>
    </div>
  );
};

// ${
//   align ? `${align}` : "left-0"
// }

export default SearchFilterModel;
