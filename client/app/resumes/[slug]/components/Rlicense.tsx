import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "../../../components/Card";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import HeaderController from "./shared/HeaderController";
import DeleteCheckModal from "./shared/DeleteCheckModal";
import TextFiled from "./shared/TextFiled";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveCheck from "./shared/SaveCheck";
import {
  useDeleteResumeDetail,
  usePostResumeDetail,
  usePutResumeDetail,
} from "@/hooks/Resume/useResumeDetail";

// 證照

interface License {
  name: string;
  id: string;
  resumeId: string;
  userId: string;
}

interface Props {
  userId: string;
  resumeId: string;
  license: License[];
}

const Rlicense = ({ userId, resumeId, license }: Props) => {
  const [data, setData] = useState<License[]>([]);
  const [isNewing, setIsNewing] = useState(false);

  useEffect(() => {
    if (license) {
      setData(license);
    }
  }, [license]);

  const handleNew = () => {
    setIsNewing(true);
  };

  const renderedLicense = () => {
    if (data.length > 0) {
      return data.map((license) => (
        <LicenseCard
          key={license.name}
          license={license}
          resumeId={resumeId}
          userId={userId}
        />
      ));
    } else {
      return <div className="w-full text-center">秀出證照證明自己！</div>;
    }
  };

  return (
    <Card>
      <ResumeItemHeader label="證照">
        <HeaderController
          text="新增"
          Icon={AddIcon}
          isEditing={isNewing}
          setIsEditing={() => {
            setIsNewing(!isNewing);
          }}
        />
      </ResumeItemHeader>
      <ResumeItemContent>
        <div className="flex flex-col w-full justify-center gap-2">
          {isNewing !== false ? (
            <NewLicenseCard
              setIsNewing={setIsNewing}
              userId={userId}
              resumeId={resumeId}
            />
          ) : (
            <>{renderedLicense()}</>
          )}
        </div>
      </ResumeItemContent>
    </Card>
  );
};

const NewLicenseCard = ({
  setIsNewing,
  resumeId,
  userId,
}: {
  resumeId: string;
  userId: string;
  setIsNewing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [license, setLicense] = useState({
    name: "",
    id: "",
    resumeId: "",
    userId: "",
  });

  const { mutate: PostMutate } = usePostResumeDetail(resumeId);

  const onSave = () => {
    PostMutate({
      userId,
      resumeId,
      endpoint: "license",
      formData: {
        name: license.name,
      },
    });
    setIsNewing(false);
  };
  const onCancel = () => {
    setIsNewing(false);
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLicense({ ...license, name: e.target.value });
  };

  return (
    <>
      <TextFiled
        label="證照名稱："
        name="name"
        value={license.name}
        onChange={handleTextChange}
      />
      <SaveCheck
        disabled={license.name === ""}
        onSave={onSave}
        onCancel={onCancel}
      ></SaveCheck>
    </>
  );
};

const LicenseCard = ({
  license,
  userId,
  resumeId,
}: {
  userId: string;
  resumeId: string;
  license: License;
}) => {
  const [data, setData] = useState(license);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: PutMutate } = usePutResumeDetail(license.resumeId);
  const { mutate: DeleteMutate } = useDeleteResumeDetail(license.resumeId);

  const handleSave = () => {

    PutMutate({
      userId,
      resumeId,
      endpoint: "license",
      endpointId: data.id,
      formData: {
        name: data.name,
      },
    });
  };

  const handleDelete = () => {
    DeleteMutate({
      userId,
      resumeId,
      endpoint: "license",
      endpointId: data.id,
    });
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, name: e.target.value });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex mb-3">
        {isEditing ? (
          <TextFiled
            label="證照名稱："
            name="name"
            value={data.name}
            disabled={!isEditing}
            onChange={handleTextChange}
          />
        ) : (
          <div className="w-full">
            <span>證照名稱：</span>
            <span className="font-bold">{license.name}</span>
          </div>
        )}

        <div className="flex justify-end items-center gap-3 text-gray-500 w-[100px]">
          <div
            className="cursor-pointer hover:text-gray-800"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </div>
          <div
            className="cursor-pointer hover:text-red-800"
            onClick={() => setOpen(true)}
          >
            <DeleteIcon />
          </div>
        </div>
        <DeleteCheckModal
          open={open}
          onDelete={handleDelete}
          onClose={() => setOpen(false)}
        />
      </div>
      <div className="w-full">
        {isEditing ? (
          <SaveCheck
            disabled={data.name === ""}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          ></SaveCheck>
        ) : null}
      </div>
    </div>
  );
};

export default Rlicense;
