const ResumeItemHeader = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="py-3">
      <div className="text-xl border-solid border-0 border-b border-gray-300 w-full text-center leading-10 font-bold relative">
        <div>
          {label}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResumeItemHeader;
