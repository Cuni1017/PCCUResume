import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

const cardClassnames =
  "w-[220px] border border-solid border-gray-300 rounded p-2 bg-white hover:bg-gray-200";

const HomePage = async () => {
  return (
    <div className="md:max-w-[860px] lg:max-w-[1140px] m-auto px-3 md:p-0">
      <div className="flex flex-col items-center justify-center py-4">
        <h1 className="text-4xl">C4 企業實習媒合系統</h1>
        <div className="text-3xl flex flex-col gap-4">
          <div className="flex sm:items-center flex-col sm:flex-row">
            <b className="w-[150px]">組員：</b>
            林晅緯、劉明偉、賴奇懋
          </div>
          <div className="flex items-center">
            <b className="w-[150px]">指導教授：</b> 李志仁
          </div>
          <div className="flex items-center">
            <b className="w-[150px]">指導學長：</b> 郭先旻
          </div>
        </div>

        <div>
          <h2>提供功能：</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2 text-xl">
            <div className={cardClassnames}>
              共同功能：
              <ul>
                <li>找實習</li>
                <li>找公司(未完成)</li>
                <li>實習公告/資訊</li>
                <li>追蹤職缺</li>
                <li>上傳/切割圖片</li>
              </ul>
            </div>
            <div className={cardClassnames}>
              學生功能：
              <ul>
                <li>應徵職缺</li>
                <li>新增/編輯履歷</li>
                <li>推薦職缺(未完成)</li>
              </ul>
            </div>
            <div className={cardClassnames}>
              廠商功能：
              <ul>
                <li>刊登/編輯職缺</li>
                <li>編輯公司資訊</li>
                <li>搜尋人才(未完成)</li>
              </ul>
            </div>
            <div className={cardClassnames}>
              教師功能：
              <ul>
                <li>實習公告新增/編輯</li>
                <li>審核學生、公司註冊</li>
                <li>審核職缺申請</li>
                <li>審核應徵行為</li>
                <li>統計資料(未完成)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
