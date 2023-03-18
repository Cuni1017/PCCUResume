import InfoCard from "../components/SearchContainer/InfoCard";

const fetchJobs = async () => {
  const res = await fetch("http://localhost:8080/vacancies", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImlkIjoiQzY2MDQyMzgxMCIsInVzZXJuYW1lIjoiY29yeTEiLCJzdWIiOiJjb3J5MSIsImlhdCI6MTY3OTEyNzg3MiwiZXhwIjoxNjc3NDI0OTA1fQ.fImtD2hMpgWUQmQZlCwkTQeGwFtEQkiVliLLRblMpV4",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
};

const JobsSearchHomePage = async () => {
  const data = await fetchJobs();
  // console.log(data);

  return (
    <>
      <InfoCard />
      <InfoCard />
    </>
  );
};

export default JobsSearchHomePage;
