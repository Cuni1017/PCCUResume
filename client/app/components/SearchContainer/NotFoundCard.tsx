import Card from "../Card";

const NotFoundCard = () => {
  return (
    <Card classnames="flex items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-base text-slate-500">沒有搜尋結果</div>
        <div className="text-sm text-slate-500">請嘗試別的搜尋條件</div>
      </div>
    </Card>
  );
};

export default NotFoundCard;
