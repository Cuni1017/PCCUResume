"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "../../../components/Card";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import HeaderController from "./shared/HeaderController";
import AddIcon from "@mui/icons-material/Add";
import SaveCheck from "./shared/SaveCheck";
import TextFiled from "./shared/TextField";
import MUITextField from "@mui/material/TextField";
import ResumeDetailActions from "./shared/ResumeDetailActions";
import Tooltip from "@mui/material/Tooltip";
import {
  useDeleteResumeDetail,
  usePostResumeDetail,
  usePutResumeDetail,
} from "@/hooks/resume/useResumeDetail";

// 在校成績

interface Subject {
  id?: string;
  userId?: string;
  resumeId: string;
  subjectName: string;
  subjectTalk: string;
  subjectScore: number;
  subjectRank: number;
  subjectTotalPeople: number;
}

interface Props {
  userId: string;
  resumeId: string;
  subjects: Subject[];
  isEditMode: boolean;
}

const initailSubject = {
  subjectName: "",
  subjectTalk: "",
  subjectScore: 0,
  subjectRank: 0,
  subjectTotalPeople: 0,
};

const Rsubjects = ({ userId, resumeId, subjects, isEditMode }: Props) => {
  const [data, setData] = useState<Subject[]>(subjects);
  const [EditSubject, setEditSubject] = useState<null | Subject>(null);

  const renderedSubjectCard = () => {
    if (data.length > 0) {
      return data.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          setEditSubject={setEditSubject}
          isEditMode={isEditMode}
        />
      ));
    }
    return (
      <div className="text-center">填寫在校優秀成績，讓公司知道你的長處！</div>
    );
  };

  useEffect(() => {
    if (subjects) {
      setData(subjects);
    }
  }, [subjects]);

  return (
    <Card>
      <ResumeItemHeader label="校內成績">
        <HeaderController
          text="新增"
          Icon={AddIcon}
          isEditing={!!EditSubject}
          setIsEditing={() => {
            if (EditSubject === null)
              setEditSubject({ ...initailSubject, resumeId, userId });
            else setEditSubject(null);
          }}
          isEditMode={isEditMode}
        />
      </ResumeItemHeader>
      <ResumeItemContent>
        <div className="flex flex-col w-full justify-center gap-2">
          {EditSubject !== null ? (
            <SubjectEditCard
              subject={EditSubject}
              setEditSubject={setEditSubject}
            />
          ) : (
            <>{renderedSubjectCard()}</>
          )}
        </div>
      </ResumeItemContent>
    </Card>
  );
};

export default Rsubjects;

const SubjectEditCard = ({
  subject,
  setEditSubject,
}: {
  subject: Subject;
  setEditSubject: React.Dispatch<React.SetStateAction<Subject | null>>;
}) => {
  const [data, setData] = useState(subject);

  const { mutate: PostMutate } = usePostResumeDetail(subject.resumeId);
  const { mutate: PutMutate } = usePutResumeDetail(subject.resumeId);

  const {
    subjectName,
    subjectTalk,
    subjectScore,
    subjectRank,
    subjectTotalPeople,
  } = data;
  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!data.id) {
      PostMutate({
        userId: subject.userId as string,
        resumeId: subject.resumeId,
        endpoint: "subject",
        formData: {
          subjectName,
          subjectTalk,
          subjectScore,
          subjectRank,
          subjectTotalPeople,
        },
      });
    } else {
      PutMutate({
        userId: subject.userId as string,
        resumeId: subject.resumeId,
        endpoint: "subject",
        endpointId: data.id,
        formData: {
          subjectName,
          subjectTalk,
          subjectScore,
          subjectRank,
          subjectTotalPeople,
        },
      });
    }
    setEditSubject(null);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-3">
      <TextFiled
        label="課程名稱："
        value={subjectName}
        name="subjectName"
        onChange={handleTextChange}
      ></TextFiled>
      <div className="w-full flex flex-col md:gap-1">
        <div>學習心得：</div>
        <MUITextField
          value={subjectTalk}
          multiline
          fullWidth
          minRows={2}
          maxRows={6}
          name="subjectTalk"
          onChange={handleTextChange}
        ></MUITextField>
      </div>

      <div className="w-full md:max-w-[700px] flex flex-col md:flex-row justify-center items-start md:items-center">
        <div className="w-full max-w-[100px]">課程成績：</div>
        <MUITextField
          fullWidth
          name="subjectScore"
          value={subjectScore || ""}
          error={subjectScore > 100 || subjectScore < 0}
          size="small"
          type="number"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
          onChange={handleTextChange}
        />
        <div className="w-full max-w-[70px] md:text-center mt-2 md:m-0">
          排名：
        </div>
        <div className="w-full flex gap-2">
          <MUITextField
            fullWidth
            name="subjectRank"
            value={subjectRank || ""}
            label="名次"
            size="small"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            error={subjectTotalPeople < 0}
            onChange={handleTextChange}
          />
          <div className="flex items-center justify-center">／</div>
          <MUITextField
            fullWidth
            name="subjectTotalPeople"
            value={subjectTotalPeople || ""}
            error={subjectTotalPeople < 0 || subjectRank > subjectTotalPeople}
            label="總人數"
            size="small"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <SaveCheck
        disabled={
          subjectName === "" ||
          subjectScore <= 0 ||
          subjectScore > 100 ||
          subjectRank <= 0 ||
          subjectTotalPeople <= 0 ||
          subjectRank > subjectTotalPeople ||
          subjectTalk === ""
        }
        onSave={handleSave}
        onCancel={() => {
          setEditSubject(null);
        }}
      />
    </div>
  );
};

const SubjectCard = ({
  subject,
  setEditSubject,
  isEditMode,
}: {
  subject: Subject;
  setEditSubject: React.Dispatch<React.SetStateAction<Subject | null>>;
  isEditMode: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { mutate: DeleteMutate } = useDeleteResumeDetail(subject.resumeId);

  const {
    subjectName,
    subjectTalk,
    subjectScore,
    subjectRank,
    subjectTotalPeople,
  } = subject;

  const handleDelete = (subjectId: string) => {
    DeleteMutate({
      userId: subject.userId as string,
      resumeId: subject.resumeId,
      endpoint: "subject",
      endpointId: subjectId,
    });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex gap-2">
        <div className="font-bold text-lg">{subjectName}</div>
        {hovered && isEditMode ? (
          <div className="flex gap-2 text-gray-500">
            <ResumeDetailActions
              onEditClick={() => setEditSubject(subject)}
              onDelete={() => {
                handleDelete(subject.id as string);
                setOpen(false);
                setHovered(false);
              }}
              onClose={() => setHovered(false)}
            />
          </div>
        ) : null}

        {/* <div className="flex items-center cursor-pointer border-solid border rounded-full border-gray-300">
          <Tooltip title="成績">
            <div className="text-sm text-slate-500 px-2">{subjectScore} </div>
          </Tooltip>
        </div> */}
        <div className="ml-auto flex items-center">
          <div className="text-sm">
            排名：{subjectRank}／{subjectTotalPeople}
          </div>
        </div>
      </div>
      <div className="">{subjectTalk}</div>
    </div>
  );
};
