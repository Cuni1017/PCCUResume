import Card from "@/app/components/Card";

import EditJob from "../../components/EditJob.tsx";
import { Vacancy } from "@/app/components/SearchContainer/JobInfoCard";
import { axiosInstance } from "@/axiosInstance.ts";

const NewJobPage = (props: any) => {
  const { params } = props;

  return (
    <div className="pt-5 px-3 md:px-0 m-auto h-full sm:max-w-[600px] md:max-w-[860px] lg:max-w-[1140px]">
      <div className="text-2xl">新增職缺</div>
      <div className="flex flex-col lg:flex-row gap-5">
        <Card classnames="w-full lg:w-[72%]">
          <EditJob companyName={decodeURI(params.slug)} jobId={""} />
        </Card>
        <div>推薦文章</div>
      </div>
    </div>
  );
};

export default NewJobPage;
