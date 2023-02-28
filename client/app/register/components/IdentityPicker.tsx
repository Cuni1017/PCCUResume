import Image from "next/image";

const IdentityPicker = (props: any) => {
  const { setIdentity, handleNext } = props;

  return (
    <div>
      <h1 className="m-0 mb-10">請問您是？</h1>
      <div className="flex flex-wrap justify-center gap-10">
        <button
          onClick={() => {
            setIdentity("STD");
            handleNext();
          }}
          className="border-solid border border-gray-200 px-10 py-6 cursor-pointer bg-white text-xl font-bold flex flex-col items-center "
        >
          <Image src="/STU.png" alt="" width={100} height={100} />
          學生
        </button>
        <button
          onClick={() => {
            setIdentity("CPN");
            handleNext();
          }}
          className="border-solid border border-gray-200 px-10 py-6 cursor-pointer bg-white text-xl font-bold flex flex-col items-center "
        >
          <Image src="/CPN.png" alt="" width="100" height="100" />
          廠商
        </button>
        <button
          onClick={() => {
            setIdentity("TCH");
            handleNext();
          }}
          className="border-solid border border-gray-200 px-10 py-6 cursor-pointer bg-white text-xl font-bold flex flex-col items-center "
        >
          <Image src="/TCH.png" alt="" width="100" height="100" />
          教師
        </button>
      </div>
    </div>
  );
};

export default IdentityPicker;
