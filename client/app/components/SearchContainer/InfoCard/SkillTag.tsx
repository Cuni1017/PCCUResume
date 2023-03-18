"use client";

const SkillTag = ({ skill }: { skill: string }) => {
  const handleClick = () => {};

  return (
    <div
      className="px-2 py-1 border-solid border border-gray-300 rounded-md text-sm text-gray-500 cursor-pointer"
      onClick={handleClick}
    >
      {skill}
    </div>
  );
};

export default SkillTag;
