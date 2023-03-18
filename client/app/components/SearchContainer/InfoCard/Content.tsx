import Card from "@/app/components/Card";
import Link from "next/link";
import SkillTag from "./SkillTag";

const Content = () => {
  return (
    <div className="flex gap-3">
      <div className="hidden lg:block w-2/12">
        <Link href="#" target="_blank">
          <Card classnames="flex justify-center w-[70px] h-[70px] m-auto">
            <img
              src="https://media.cakeresume.com/image/upload/s--5JU713tR--/c_pad,fl_png8,h_100,w_100/v1577246016/q3dazcv6tw7gx2xygu4y.png"
              alt=""
            />
          </Card>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4 lg:gap-0">
          <Link href="#" target="_blank">
            <Card classnames="lg:hidden flex justify-center w-[50px] h-[50px] m-auto">
              <img
                src="https://media.cakeresume.com/image/upload/s--5JU713tR--/c_pad,fl_png8,h_100,w_100/v1577246016/q3dazcv6tw7gx2xygu4y.png"
                alt=""
              />
            </Card>
          </Link>
          <div className="flex flex-col">
            <Link href="#" target="_blank" className="flex items-center">
              <div className="w-full flex items-center text-xl hover:underline">
                Frontend Engineer
              </div>
            </Link>
            <Link href="#" target="_blank" className="flex items-center">
              <div className="w-full flex items-center text-[1rem] leading-[1.60rem] hover:underline">
                Splashtop Inc.
              </div>
            </Link>
          </div>
        </div>
        <div className="">
          前端工程師將與後端工程師、設計師、產品經理或其他夥伴組成跨職能團隊，針對遠端桌面、遠端連線服務的後台支援系統各項機能，翻新設計、改進用戶體驗，並根據不同產品線的需求完成新功能
        </div>
        <div className="flex flex-wrap gap-1">
          <SkillTag skill="Java" />
          <SkillTag skill="React" />
        </div>
      </div>
    </div>
  );
};

export default Content;
