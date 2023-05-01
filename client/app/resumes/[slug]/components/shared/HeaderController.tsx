import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  text: string;
  isEditing: boolean | number | null;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean | number | null>>;
  isEditMode: boolean;
}

const HeaderController = ({
  Icon,
  text,
  isEditing,
  setIsEditing,
  isEditMode,
}: Props) => {
  return (
    <span
      onClick={() => setIsEditing(!isEditing)}
      className="text-end text-sm flex items-center justify-end text-gray-500 hover:text-gray-800 cursor-pointer absolute top-1 right-5 gap-1"
    >
      {isEditMode ? (
        isEditing !== null && isEditing !== false ? (
          <>
            <CloseIcon /> 關閉
          </>
        ) : (
          <>
            <Icon /> {text}
          </>
        )
      ) : null}
    </span>
  );
};

export default HeaderController;
