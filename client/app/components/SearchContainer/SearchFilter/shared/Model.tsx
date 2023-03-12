import React, { useState, useRef, useEffect } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const SearchFilterModel = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
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
      document.addEventListener("click", handler, true);

      return () => {
        document.removeEventListener("click", handler);
      };
    }
  }, []);

  return (
    <div ref={divEl} className="relative cursor-pointer rounded-sm">
      <div
        className={`flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-sm ${
          isOpen ? "bg-blue-100 hover:bg-blue-100" : ""
        }`}
        onClick={handleClick}
      >
        {label} <ExpandMoreOutlinedIcon />
      </div>

      {isOpen ? (
        <div className="bg-white absolute left-0 top-10 border-solid border-gray-300 border rounded-md shadow">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default SearchFilterModel;
