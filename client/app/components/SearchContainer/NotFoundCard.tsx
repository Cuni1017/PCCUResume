import Card from "../Card";
import Image from "next/image";

const NotFoundCard = () => {
  return (
    <Card classnames="flex items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative w-[5rem] h-[5rem]">
          <Image src={"/error.png"} alt="error" fill sizes="100%" />
        </div>
        <div className="text-base text-slate-500">沒有搜尋結果</div>
        <div className="text-sm text-slate-500">請嘗試別的搜尋條件。</div>
      </div>
    </Card>
  );
};

export default NotFoundCard;
