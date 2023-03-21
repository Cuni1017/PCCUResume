import CompanyHeader from "./components/CompanyHeader/CompanyHeader";

const CompanyPage = (props: any) => {
  const {
    params: { slug: companyName },
    searchParams,
  } = props;

  return (
    <div>
      <CompanyHeader page="/" companyName={companyName} />
      {decodeURI(companyName)} 公司介紹頁面
    </div>
  );
};

export default CompanyPage;
