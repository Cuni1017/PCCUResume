import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

const HomePage = async () => {
  return (
    <div className="md:max-w-[860px] lg:max-w-[1140px] m-auto px-3 md:p-0">
      HomePage
    </div>
  );
};

export default HomePage;
