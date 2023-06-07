import Card from "../../../components/Card";
import Image from "next/image";

const UserCard = ({
  userInfo,
}: {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    headshot: string;
    AQ: string;
  };
}) => {
  const { name, email, phone, headshot, AQ } = userInfo;
  
  return (
    <Card classnames="relative">
      <div className="w-full h-[25vw] md:h-[15rem] relative">
        <Image
          src="/PCCUResume.png"
          alt={`${name}'s Background`}
          fill
          sizes="100%"
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute left-10 md:top-[11.5rem] hidden md:block">
        <div className="rounded-full overflow-hidden">
          <div className="w-[100px] h-[100px] relative">
            <Image
              src={headshot ? headshot : "/PCCUResume.png"}
              fill
              sizes="100%"
              alt="cat"
              priority
            ></Image>
          </div>
        </div>
        <div
          style={{ textShadow: "0 1px 3px #292929" }}
          className="absolute left-32 top-6 text-white font-bold whitespace-nowrap text-xl"
        >
          {name}
        </div>
      </div>

      <div className="p-4 pt-20 md:p-4 md:pl-[10.5rem] relative">
        <div className="absolute left-[50%] translate-x-[-50%] top-[-44px] md:hidden flex flex-col items-center">
          <div className="rounded-full overflow-hidden">
            <div className="w-[80px] h-[80px] relative">
              <Image
                src={headshot ? headshot : "/PCCUResume.png"}
                fill
                sizes="100%"
                alt="cat"
                priority
              ></Image>
            </div>
          </div>
          <div className="font-bold text-xl">{name}</div>
        </div>
        <div className="flex flex-col mb-3">
          <div className="text-sm font-bold flex gap-1">
            <div>{AQ}</div>
            <div className="text-slate-200">|</div>
            <div>資訊工程系</div>
          </div>
        </div>

        <div className="text-sm">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="font-bold w-[5rem]">主要手機</div>
              <div>+886 {phone}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="font-bold w-[5rem]">E-Mail</div>
              <div>{email}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
