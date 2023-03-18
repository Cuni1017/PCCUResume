import Image from "next/image";

const IdentityPicker = (props: any) => {
  const { setIdentity, handleNext, handleComplete } = props;

  const handleClick = (id: string) => {
    setIdentity(id);
    handleNext();
    handleComplete();
  };

  return (
    <div className="mt-10 flex flex-col h-full">
      <h1 className="m-5">請問您是？</h1>
      <div className="grow flex items-center">
        <div className="flex flex-wrap justify-center gap-16 w-full mb-32">
          <button
            onClick={() => handleClick("STD")}
            className="border-solid border border-gray-200 px-10 py-6 cursor-pointer bg-white text-xl font-bold flex flex-col items-center gap-1"
          >
            <Image src="/STU.png" alt="" width={100} height={100} priority />
            學生
          </button>
          <button
            onClick={() => handleClick("CPN")}
            className="border-solid border border-gray-200 px-10 py-6 cursor-pointer bg-white text-xl font-bold flex flex-col items-center gap-1"
          >
            <Image src="/CPN.png" alt="" width="100" height="100" />
            公司
          </button>
          <button
            onClick={() => handleClick("TCH")}
            className="border-solid border border-gray-200 px-10 py-6 cursor-pointer bg-white text-xl font-bold flex flex-col items-center gap-1"
          >
            <Image src="/TCH.png" alt="" width="100" height="100" />
            教師
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityPicker;
