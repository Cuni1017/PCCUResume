const CompanyJobs = async (props: any) => {
  const { params } = props;

  return <div>{params.slug} 公司的所有職缺</div>;
};

export default CompanyJobs;
