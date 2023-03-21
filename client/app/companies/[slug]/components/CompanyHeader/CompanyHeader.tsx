import HeaderBackground from "./HeaderBackground";
import HeaderLogo from "./HeaderLogo";
import HeaderAction from "./HeaderAction";
import HeaderNavigationBar from "./HeaderNavigationBar";

const CompanyHeader = ({
  page,
  companyName,
}: {
  page: string;
  companyName: string;
}) => {
  return (
    <div className="w-full rounded-b-md  overflow-hidden shadow-md">
      <HeaderBackground />
      <div className="w-full md:h-[84px] bg-white relative">
        <div className="max-w-[24rem] sm:max-w-[36rem] md:max-w-none m-auto px-3 relative">
          <HeaderLogo />
          <div className="p-0 md:pl-[140px] pt-2 flex flex-col gap-[0.4rem]">
            <div className="text-2xl pl-20 md:p-0">
              {decodeURI(companyName)}
            </div>
            <div className="md:absolute md:right-7 md:top-6 flex gap-2 text-md">
              <HeaderAction companyName={companyName} />
            </div>
            <div className="flex text-sm">
              <HeaderNavigationBar page={page} companyName={companyName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
