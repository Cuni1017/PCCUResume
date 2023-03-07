import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "../../../components/Card";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import DeleteCheckModal from "./shared/DeleteCheckModal";
import TextFiled from "./shared/TextFiled";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveCheck from "./shared/SaveCheck";

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
  // console.log(data);

  useEffect(() => {
    if (license) {
      setData(license);
    }
  }, [license]);

  const handleNew = () => {
    setIsNewing(true);
  };

  const handleSave = () => {};

  const renderedLicense = () => {
    if (data.length > 0) {
      return data.map((license) => (
        <LicenseCard key={license.name} license={license} />
      ));
    } else {
      return <div className="w-full text-center">秀出證照證明自己！</div>;
    }
  };

  return (
    <Card>
      <ResumeItemHeader label="證照">
        {isNewing !== false ? null : (
          <span
            onClick={handleNew}
            className="text-end text-sm flex items-center justify-end text-gray-500 hover:text-gray-800 cursor-pointer absolute top-1 right-5"
          >
            <AddIcon />
            新增
          </span>
        )}
      </ResumeItemHeader>
      <ResumeItemContent>
        <div className="flex flex-col w-full justify-center gap-2">
          {renderedLicense()}
          {isNewing !== false ? (
            <NewLicenseCard setIsNewing={setIsNewing} handleSave={handleSave} />
          ) : null}
        </div>
      </ResumeItemContent>
    </Card>
  );
};

const NewLicenseCard = ({
  handleSave,
  setIsNewing,
}: {
  handleSave: (license: License) => void;
  setIsNewing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [license, setLicense] = useState({
    name: "",
    id: "",
    resumeId: "",
    userId: "",
  });

  const onSave = () => {
    console.log(license, "save");
    handleSave(license);
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

const LicenseCard = ({ license }: { license: License }) => {
  const [data, setData] = useState(license);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSave = () => {
    console.log(data, "save");
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
            onClick={handleOpen}
          >
            <DeleteIcon />
          </div>
        </div>
        <DeleteCheckModal
          open={open}
          onDelete={() => {
            console.log(license, "delete");
          }}
          onClose={handleClose}
        />
      </div>
      <div className="w-full">
        {isEditing ? (
          <SaveCheck
            disabled={data.name === ""}
            onSave={onSave}
            onCancel={() => setIsEditing(false)}
          ></SaveCheck>
        ) : null}
      </div>
    </div>
  );
};

export default Rlicense;
