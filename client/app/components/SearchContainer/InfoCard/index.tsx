import Card from "@/app/components/Card";
import Content from "./Content";
import Detail from "./Detail";
import Action from "./Action";

const InfoCard = () => {
  return (
    <Card>
      <div className="flex flex-col md:flex-row p-5 gap-6">
        <div className="w-full md:w-8/12">
          <Content />
        </div>
        <div className="w-full md:w-4/12">
          <Detail />
        </div>
      </div>
      <div className="px-5 py-3 md:p-5">
        <Action />
      </div>
    </Card>
  );
};

export default InfoCard;
