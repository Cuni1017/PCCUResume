import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "../../../components/Card";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import HeaderController from "./shared/HeaderController";
import EditIcon from "@mui/icons-material/Edit";
import OutlinedInput from "@mui/material/OutlinedInput";
import SaveCheck from "./shared/SaveCheck";
import {
  useDeleteResumeDetail,
  usePostResumeDetail,
  usePutResumeDetail,
} from "@/hooks/Resume/useResumeDetail";

// 自傳

interface AutoBiography {
  chineseAutobiography: string | null;
  englishAutobiography: string | null;
  id: string;
  resumeId: string;
  userId: string;
}

interface Props {
  userId: string;
  resumeId: string;
  autobiography: AutoBiography | null;
}

const Rautobiography = ({ userId, resumeId, autobiography }: Props) => {
  const [data, setData] = useState<AutoBiography>({
    chineseAutobiography: "",
    englishAutobiography: "",
    id: "",
    resumeId: "",
    userId: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (autobiography) {
      setData(autobiography);
    }
  }, [autobiography]);

  const renderedAutoBiography = () => {
    if (!data.chineseAutobiography && !data.englishAutobiography) {
      return <div className="w-full text-center">填寫自傳讓公司更了解你！</div>;
    } else {
      return (
        <div className="flex flex-col gap-2">
          {data.chineseAutobiography && (
            <AutoBiographyCard autobiography={data.chineseAutobiography} />
          )}
          {data.chineseAutobiography && data.englishAutobiography && (
            <hr className="w-full" />
          )}
          {data.englishAutobiography && (
            <AutoBiographyCard autobiography={data.englishAutobiography} />
          )}
        </div>
      );
    }
  };

  return (
    <Card>
      <ResumeItemHeader label="自傳">
        <HeaderController
          text="編輯"
          Icon={EditIcon}
          isEditing={isEditing}
          setIsEditing={() => {
            setIsEditing(!isEditing);
          }}
        />
      </ResumeItemHeader>
      <ResumeItemContent>
        <div className="flex flex-col w-full">
          {isEditing ? (
            <AutoBiographyEditCard
              userId={userId}
              resumeId={resumeId}
              autobiography={data}
              setIsEditing={setIsEditing}
            />
          ) : (
            renderedAutoBiography()
          )}
        </div>
      </ResumeItemContent>
    </Card>
  );
};

const AutoBiographyEditCard = ({
  userId,
  resumeId,
  autobiography,
  setIsEditing,
}: {
  userId: string;
  resumeId: string;
  autobiography: AutoBiography;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState(autobiography);

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { mutate: PostMutate } = usePostResumeDetail(resumeId);
  const { mutate: PutMutate } = usePutResumeDetail(data.resumeId);
  const { mutate: DeleteMutate } = useDeleteResumeDetail(data.resumeId);

  const handleSave = () => {
    console.log(data, "save");
    if (!data.id) {
      PostMutate({
        userId,
        resumeId,
        endpoint: "autobiography",
        formData: {
          chineseAutobiography: data.chineseAutobiography,
          englishAutobiography: data.englishAutobiography,
        },
      });
    } else {
      PutMutate({
        userId,
        resumeId,
        endpoint: "autobiography",
        endpointId: data.id,
        formData: {
          chineseAutobiography: data.chineseAutobiography,
          englishAutobiography: data.englishAutobiography,
        },
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-bold">中文自傳：</div>
          <div className="w-full">
            <OutlinedInput
              fullWidth
              value={data.chineseAutobiography}
              onChange={handleTextChange}
              multiline
              minRows={5}
              name="chineseAutobiography"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">英文自傳：</div>
          <div className="w-full">
            <OutlinedInput
              fullWidth
              value={data.englishAutobiography}
              onChange={handleTextChange}
              multiline
              minRows={5}
              name="englishAutobiography"
            />
          </div>
        </div>
      </div>
      <SaveCheck
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
        disabled={
          false
          // data.chineseAutobiography === "" && data.englishAutobiography === ""
        }
      />
    </div>
  );
};

const AutoBiographyCard = ({ autobiography }: { autobiography: string }) => {
  return (
    <div className="w-full">
      <div>{autobiography}</div>
    </div>
  );
};

export default Rautobiography;
