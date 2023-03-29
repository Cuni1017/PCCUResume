import CompanyHeader from "../components/CompanyHeader/CompanyHeader";

const ApplicantsPage = (props: any) => {
  const {
    params: { slug: companyName },
  } = props;

  return (
    <div>
      <CompanyHeader page="/applicants" companyName={companyName} />
      {decodeURI(companyName)} 公司的ApplicantsTracking頁面
    </div>
  );
};

export default ApplicantsPage;
