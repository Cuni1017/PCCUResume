"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SkillTag = ({ skill }: { skill: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let searchParamsList = searchParams
    ?.toString()
    ?.split("&")
    .filter((x) => x);

  const handleClick = () => {
    // console.log(pathname);
    // console.log(searchParamsList);
    router.push(`/jobs/${skill}`);
    // window.open(`/jobs/${skill}`);
  };

  return (
    <div
      className="px-2 py-1 border-solid border border-gray-300 rounded-md text-sm text-gray-500 cursor-pointer inline-block"
      onClick={handleClick}
    >
      {skill}
    </div>
  );
};

export default SkillTag;
