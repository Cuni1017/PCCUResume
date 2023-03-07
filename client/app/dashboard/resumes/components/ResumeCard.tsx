import Card from "../../../components/Card";
import CardFooter from "./CardFooter";
import { Resume } from "../page";

const ResumeCard = ({ resume, userId }: { resume: Resume; userId: string }) => {
  return (
    <Card className="bg-white border-solid border-gray-300 border shadow">
      <div className="p-3">
        <h3 className="m-0">{resume.name}</h3>
        <div className="flex justify-end text-sm">
          <div className="cursor-pointer">{resume.createTime}</div>
        </div>
      </div>
      <div className="flex px-2 py-2 gap-2 bg-gray-100 border-solid border-0 border-t border-gray-300">
        <CardFooter resume={resume} userId={userId} />
      </div>
    </Card>
  );
};

export default ResumeCard;
