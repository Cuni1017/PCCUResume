const MePage = (props: any) => {
  const { params } = props;
  return <div>{params.username}的個人頁面</div>;
};

export default MePage;
