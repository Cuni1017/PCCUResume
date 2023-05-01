import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { axiosInstance } from "@/axiosInstance.ts";
import { useGetSkills } from "@/hooks/useSkills";
import SearchBar from "@/app/components/SearchContainer/SearchFilter/shared/SearchBar";

export interface Skill {
  skillId: number;
  skillName: string;
}

const SkillPicker = ({
  techs,
  error,
  handleSkillChange,
}: {
  techs: string | Skill[];
  error?: boolean;
  handleSkillChange: (skillArray: Skill[]) => void;
}) => {
  const [skills, setSkills] = useState<Skill[] | null>(null); // 後端資料
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data }: { data: Skill[] } = await axiosInstance.get(
        "/vacancies/skills"
      );
      if (JSON.stringify(data) !== JSON.stringify(skills)) setSkills(data);
    };
    fetchSkills();
  }, [skills]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElem = dropDownRef.current;
      if (
        dropdownElem !== null &&
        !dropdownElem.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // 同步skillId到UI
  useEffect(() => {
    if (techs && skills && typeof techs === "string") {
      const skillArray = techs.split(",").map((tech) => {
        const skill = skills.find((skill) => skill.skillName === tech);
        if (!skill) return;
        const skillId = parseInt(skill?.skillId as unknown as string); //過來的skillId是string
        return { skillId, skillName: skill.skillName };
      });

      if (skillArray) handleSkillChange(skillArray as Skill[]);
    }
  }, [skills]);

  const handleOptionsClick = useCallback(
    (skillId: number, skillName: string) => {
      if (typeof techs === "string") {
        handleSkillChange([{ skillId, skillName }] as Skill[]);
        return;
      }

      if (techs.findIndex((tech) => tech.skillId === skillId) === -1) {
        handleSkillChange([...techs, { skillId, skillName }] as Skill[]);
      }
    },
    [handleSkillChange, techs]
  );

  const renderedListItem = useMemo(
    () => (
      <SkillListItems
        skills={skills}
        searchTerm={searchTerm}
        onClick={handleOptionsClick}
      />
    ),
    [handleOptionsClick, searchTerm, skills]
  );

  return (
    <div className="relative rounded" ref={dropDownRef}>
      <InputSkillChips
        error={error}
        onClick={() => setIsOpen(!isOpen)}
        chipData={typeof techs === "string" ? [] : techs}
        setChipData={handleSkillChange}
      />
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "absolute",
          bottom: "-29rem",
          zIndex: "10",
          padding: "0",
        }}
        className="border-solid border border-gray-300"
        component="nav"
        aria-label="skills"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="p-4 border-solid border-t-0 border-r-0 border-l-0 border-b-solid  border-b-2 border-gray-300">
          <SearchBar
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col h-[390px] overflow-auto">
          {renderedListItem}
        </div>
        {/* divider、light */}
      </List>
    </div>
  );
};

const SkillListItems = ({
  skills,
  searchTerm,
  onClick,
}: {
  skills: Skill[] | null;
  searchTerm: string;
  onClick: any;
}) => {
  const renderedListItem = skills ? (
    skills
      .filter((skill) =>
        skill.skillName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((skill) => (
        <ListItem
          button
          divider
          key={skill.skillId}
          onClick={() =>
            onClick(
              parseInt(skill.skillId as unknown as string),
              skill.skillName
            )
          }
        >
          <ListItemText primary={skill.skillName} />
        </ListItem>
      ))
  ) : (
    <div className="text-center">目前查無資料，若過久請重新整理</div>
  );
  return <div>{renderedListItem}</div>;
};

const ChipListItem = styled("li")(({ theme }) => ({
  // margin: theme.spacing(0.5),
}));

const InputSkillChips = ({
  error,
  onClick,
  chipData,
  setChipData,
}: {
  error?: boolean;
  onClick: () => void;
  chipData: Skill[];
  setChipData: (skillArray: Skill[]) => void;
}) => {
  const handleDelete = (chipToDelete: Skill) => () => {
    const newArray = [...chipData].filter(
      (chip) => chip.skillId !== chipToDelete.skillId
    );
    setChipData(newArray);
  };

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer border-solid border ${
        error ? "border-red-500" : "border-gray-300"
      } flex list-none px-2 py-1 min-h-[2rem] rounded`}
    >
      <div className="grow flex flex-wrap items-center gap-1 ">
        {chipData.map((data: Skill) => {
          let icon;

          // if (data.skillName === "React") {
          //   icon = <TagFacesIcon />;
          // }

          return (
            <ChipListItem key={data.skillId}>
              <Chip
                icon={icon}
                label={data.skillName}
                onDelete={handleDelete(data)}
              />
            </ChipListItem>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        <ExpandMoreOutlinedIcon />
      </div>
    </div>
  );
};

export default SkillPicker;
